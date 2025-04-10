"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { CopyIcon, CheckIcon, MessageCircle } from "lucide-react";
import { courses } from "@/data/courses";
import { convertToLocalTime, formatTime, weekdays } from "@/utils/timeUtils";
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
  const [todaysMeetings, setTodaysMeetings] = useState({
    labs: 0,
    lectures: 0,
  });

  const currentDay = new Date().getDay();

  useEffect(() => {
    setIsLoadingTimezone(true);
    courses.forEach((data) => {
      if (currentDay - 1 === data.time.weekdayNumber) {
        setTodaysMeetings((prev) => ({
          ...prev,
          lectures: prev.lectures + 1,
        }));
      }
      if (currentDay - 1 === data.lab?.time.weekdayNumber) {
        setTodaysMeetings((prev) => ({
          ...prev,
          labs: prev.labs + 1,
        }));
      }
    });
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
  }, [currentDay]);

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

          <div className="bg-gradient-to-r from-[#A5BEA4]/30 to-[#6A9A98]/30 rounded-xl p-5 mb-8 shadow-md border-2 border-[#A5BEA4]/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#A5BEA4]/20 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#6A9A98]/20 rounded-full -ml-6 -mb-6"></div>

            <div className="flex items-center space-x-4">
              <div className="bg-[#6A9A98]/30 p-3 rounded-full shadow-inner transform hover:rotate-12 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#3F5954]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#3F5954] text-lg">
                  Todays Schedule
                </h3>
                <p className="text-sm text-[#566B5F]">
                  {todaysMeetings.lectures + todaysMeetings.labs > 0 ? (
                    <>
                      <span className="inline-block animate-bounce mr-1">
                        ✨
                      </span>
                      <span className="font-semibold">
                        Have {todaysMeetings.lectures + todaysMeetings.labs}
                      </span>
                      <span> classes today! </span>
                      <span>
                        ({todaysMeetings.lectures} lecture
                        {todaysMeetings.lectures !== 1 ? "s" : ""},{" "}
                        {todaysMeetings.labs} lab
                        {todaysMeetings.labs !== 1 ? "s" : ""})
                      </span>
                    </>
                  ) : (
                    <span>
                      <span className="inline-block animate-pulse mr-1">
                        🏖️
                      </span>{" "}
                      No classes today folks!
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

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
                          <span
                            className={`text-sm text-right  ${currentDay - 1 == lectureTime.weekdayNumber ? "text-green-600" : "text-[#7A7266]"}`}
                          >
                            <p>{weekdays[lectureTime.weekdayNumber]} </p>
                            {lectureTime.time}
                          </span>
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
                            <span
                              className={`text-sm text-right ${currentDay - 1 == labTime.weekdayNumber ? "text-green-600" : "text-[#7A7266]"}`}
                            >
                              <p>{weekdays[labTime.weekdayNumber]} </p>
                              {labTime.time}
                            </span>
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
