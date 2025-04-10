"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { CopyIcon, CheckIcon, MessageCircle } from "lucide-react";
import { courses } from "@/data/courses";
import {
  convertToLocalTime,
  formatTime,
  getWeekdayName,
  weekdays,
} from "@/utils/timeUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HydrationSafeSwitch = (props: React.ComponentProps<typeof Switch>) => {
  return <Switch {...props} suppressHydrationWarning />;
};

const HydrationSafeButton = (props: React.ComponentProps<typeof Button>) => {
  return <Button {...props} suppressHydrationWarning />;
};

export default function Home() {
  const [usePolandTime, setUsePolandTime] = useState(false);
  const [timeZoneName, setTimeZoneName] = useState("");
  const [mounted, setMounted] = useState(false);
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});
  const [isLoadingTimezone, setIsLoadingTimezone] = useState(true);

  const currentDay = new Date().getDay();

  useEffect(() => {
    setIsLoadingTimezone(true);
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        setTimeZoneName(tz);
      } else {
        console.warn("Could not determine time zone.");
        setTimeZoneName("Unknown");
      }
      setMounted(true);
    } catch (error) {
      console.error("Error getting timezone:", error);
      setTimeZoneName("Unknown");
      setMounted(true);
    } finally {
      setIsLoadingTimezone(false);
    }
  }, []);

  const getDisplayTime = (time: {
    hour: number;
    min: number;
    weekdayNumber: number;
  }): { time: string; weekdayNumber: number } => {
    if (!mounted) {
      return { time: "Loading...", weekdayNumber: time.weekdayNumber };
    }

    return usePolandTime
      ? { time: formatTime(time), weekdayNumber: time.weekdayNumber }
      : convertToLocalTime(time);
  };

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopiedLinks({ ...copiedLinks, [id]: true });

      // Reset the copied status after 2 seconds
      setTimeout(() => {
        setCopiedLinks((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    });
  };

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-opacity-90" suppressHydrationWarning>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#3F5954]">
            Group 11 Links
          </h1>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <Label htmlFor="timezone-toggle" className="text-[#566B5F]">
                {isLoadingTimezone ? "Loading..." : timeZoneName}
              </Label>
              <HydrationSafeSwitch
                id="timezone-toggle"
                checked={usePolandTime}
                onCheckedChange={setUsePolandTime}
                disabled={!mounted}
              />
              <Label htmlFor="timezone-toggle" className="text-[#566B5F]">
                Poland
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((data) => {
              const lectureTime = getDisplayTime(data.time);
              const labTime = data.lab ? getDisplayTime(data.lab.time) : null;
              const lecWeekDay = getWeekdayName(lectureTime.weekdayNumber);
              const labWeekDay = getWeekdayName(labTime?.weekdayNumber || null);
              return (
                <Card
                  key={data.name}
                  className="p-6 hover:shadow-lg hover:shadow-[#A5BEA4]/30 transition-all duration-200"
                >
                  <h2 className="text-xl font-semibold mb-4 text-[#566B5F]">
                    {data.name}
                  </h2>
                  <div className="space-y-4">
                    <div key={data.id} className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#7D98A1]">
                            Lecture
                          </span>
                          {weekdays[currentDay - 1] == lecWeekDay ? (
                            <span className="text-sm text-right text-green-600">
                              <p>{lecWeekDay} </p>
                              {lectureTime.time}
                            </span>
                          ) : (
                            <span className="text-sm text-[#7A7266] text-right">
                              <p>{lecWeekDay} </p>
                              {lectureTime.time}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={data.link}
                            target="_blank"
                            className="flex-1"
                          >
                            <HydrationSafeButton className="w-full cursor-pointer bg-[#6A9A98] hover:bg-[#5D8683]">
                              Join Lecture Meeting
                            </HydrationSafeButton>
                          </a>
                          <Tooltip>
                            <TooltipTrigger asChild className="cursor-pointer">
                              <button
                                className="min-w-10 h-10 flex items-center justify-center bg-[#6A9A98] hover:bg-[#5D8683] text-white rounded-md"
                                onClick={() =>
                                  handleCopyLink(
                                    data.link,
                                    `lecture-${data.id}`,
                                  )
                                }
                              >
                                {copiedLinks[`lecture-${data.id}`] ? (
                                  <CheckIcon className="h-4 w-4" />
                                ) : (
                                  <CopyIcon className="h-4 w-4" />
                                )}
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {copiedLinks[`lecture-${data.id}`]
                                ? "Copied!"
                                : "Copy Link"}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                      {data.lab && labTime && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#A3825C]">
                              Lab
                            </span>
                            {weekdays[currentDay - 1] == labWeekDay ? (
                              <span className="text-sm text-right text-green-600">
                                <p>{labWeekDay} </p>
                                {labTime.time}
                              </span>
                            ) : (
                              <span className="text-sm text-[#7A7266] text-right">
                                <p>{labWeekDay} </p>
                                {labTime.time}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={data.lab.link}
                              target="_blank"
                              className="flex-1"
                            >
                              <HydrationSafeButton className="w-full cursor-pointer bg-[#D1A979] hover:bg-[#BA9568]">
                                Join Lab Meeting
                              </HydrationSafeButton>
                            </a>
                            <Tooltip>
                              <TooltipTrigger
                                asChild
                                className="cursor-pointer"
                              >
                                <button
                                  className="min-w-10 h-10 flex items-center justify-center bg-[#D1A979] hover:bg-[#BA9568] text-white rounded-md"
                                  onClick={() =>
                                    data.lab &&
                                    handleCopyLink(
                                      data.lab.link,
                                      `lab-${data.id}`,
                                    )
                                  }
                                >
                                  {copiedLinks[`lab-${data.id}`] ? (
                                    <CheckIcon className="h-4 w-4" />
                                  ) : (
                                    <CopyIcon className="h-4 w-4" />
                                  )}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {copiedLinks[`lab-${data.id}`]
                                  ? "Copied!"
                                  : "Copy Link"}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Feedback Section - Telegram Link */}
          <div className="mt-16 mb-6 flex flex-col items-center">
            <a
              href="https://t.me/roshid1y"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#566B5F] hover:text-[#3F5954] transition-colors"
            >
              <MessageCircle size={16} />
              <span className="text-sm font-medium">
                Found an issue or have suggestions? Message me on Telegram
              </span>
            </a>
          </div>

          <footer className="text-center text-sm text-[#7A7266] mt-4">
            <p>© {new Date().getFullYear()} Lecture Links</p>
          </footer>
        </div>
      </main>
    </TooltipProvider>
  );
}
