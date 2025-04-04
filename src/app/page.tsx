"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";

// Custom Switch component with suppressHydrationWarning
const HydrationSafeSwitch = (props: React.ComponentProps<typeof Switch>) => {
  return <Switch {...props} suppressHydrationWarning />;
};

// Custom Button component with suppressHydrationWarning
const HydrationSafeButton = (props: React.ComponentProps<typeof Button>) => {
  return <Button {...props} suppressHydrationWarning />;
};

interface LabSession {
  link: string;
  time: {
    hour: number;
    min: number;
  };
}

interface Course {
  id: string;
  name: string;
  type: "Lecture";
  link: string;
  time: {
    hour: number;
    min: number;
  };
  lab?: LabSession;
}

// Static data for the courses (Poland time zone - UTC+2)
const courses: Course[] = [
  {
    id: "1",
    name: "Computer Science 101",
    type: "Lecture",
    link: "https://teams.microsoft.com/l/meetup-join/CS101",
    time: { hour: 9, min: 0 },
    lab: {
      link: "https://teams.microsoft.com/l/meetup-join/CS101_LAB",
      time: { hour: 11, min: 0 },
    },
  },
  {
    id: "3",
    name: "Data Structures",
    type: "Lecture",
    link: "https://teams.microsoft.com/l/meetup-join/DS",
    time: { hour: 14, min: 0 },
    lab: {
      link: "https://teams.microsoft.com/l/meetup-join/DS_LAB",
      time: { hour: 16, min: 0 },
    },
  },
  {
    id: "5",
    name: "Web Development",
    type: "Lecture",
    link: "https://teams.microsoft.com/l/meetup-join/WEB_DEV",
    time: { hour: 10, min: 0 },
    lab: {
      link: "https://teams.microsoft.com/l/meetup-join/WEB_DEV_LAB",
      time: { hour: 13, min: 0 },
    },
  },
];

// Group courses by name
const groupedCourses = courses.reduce(
  (acc, course) => {
    if (!acc[course.name]) {
      acc[course.name] = [];
    }
    acc[course.name].push(course);
    return acc;
  },
  {} as Record<string, Course[]>,
);

const convertToLocalTime = (time: { hour: number; min: number }): string => {
  try {
    const now = new Date();
    const localTimezoneOffset = now.getTimezoneOffset(); // Offset in minutes relative to UTC
    const polandTimezoneOffset = 120; // Poland is typically GMT+2 (120 minutes)
    const timezoneOffsetDifference = -(
      localTimezoneOffset + polandTimezoneOffset
    );
    let localHours = time.hour + timezoneOffsetDifference / 60;

    // Adjust for hour overflow/underflow
    if (localHours < 0) {
      localHours += 24;
    } else if (localHours >= 24) {
      localHours -= 24;
    }

    const formattedHours = Math.floor(localHours).toString().padStart(2, "0");
    const formattedMinutes = time.min.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  } catch (error) {
    console.error("Error converting time:", error);
    return "Invalid Time";
  }
};

// Format time as HH:MM
const formatTime = (time: { hour: number; min: number }): string => {
  const formattedHours = time.hour.toString().padStart(2, "0");
  const formattedMinutes = time.min.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};

export default function Home() {
  const [usePolandTime, setUsePolandTime] = useState(false);
  const [timeZoneName, setTimeZoneName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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
    }
  }, []);

  const getDisplayTime = (time: { hour: number; min: number }): string => {
    // If the component hasn't mounted yet, return the default formatted time
    // This prevents hydration errors by ensuring server and client render the same content initially
    if (!mounted) {
      return formatTime(time);
    }

    return usePolandTime ? formatTime(time) : convertToLocalTime(time);
  };

  return (
    <main className="min-h-screen bg-opacity-90" suppressHydrationWarning>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#3F5954]">
          Lecture Links
        </h1>

        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="flex items-center space-x-2">
            <Label htmlFor="timezone-toggle" className="text-[#566B5F]">
              {mounted ? timeZoneName : "Loading..."}
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
          {Object.entries(groupedCourses).map(([courseName, courseGroup]) => (
            <Card
              key={courseName}
              className="p-6 hover:shadow-lg hover:shadow-[#A5BEA4]/30 transition-all duration-200"
            >
              <h2 className="text-xl font-semibold mb-4 text-[#566B5F]">
                {courseName}
              </h2>
              <div className="space-y-4">
                {courseGroup.map((course) => (
                  <div key={course.id} className="space-y-4">
                    {/* Lecture section */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#7D98A1]">
                          Lecture
                        </span>
                        <span className="text-sm text-[#7A7266]">
                          {getDisplayTime(course.time)}
                        </span>
                      </div>
                      <a href={course.link} target="_blank">
                        <HydrationSafeButton className="w-full cursor-pointer bg-[#6A9A98] hover:bg-[#5D8683]">
                          Join Lecture Meeting
                        </HydrationSafeButton>
                      </a>
                    </div>

                    {/* Lab section - only render if lab exists */}
                    {course.lab && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#A3825C]">
                            Lab
                          </span>
                          <span className="text-sm text-[#7A7266]">
                            {getDisplayTime(course.lab.time)}
                          </span>
                        </div>
                        <a href={course.lab.link} target="_blank">
                          <HydrationSafeButton className="w-full cursor-pointer bg-[#D1A979] hover:bg-[#BA9568]">
                            Join Lab Meeting
                          </HydrationSafeButton>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
