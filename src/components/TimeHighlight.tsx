import React, { useEffect, useState } from "react";
import { convertToLocalTime, formatTime, weekdays } from "@/utils/timeUtils";
import { Course } from "@/data/courses";
interface TimeHighlightProps {
  time: Course["time"];
  usePolandTime?: boolean;
  courseType?: "lecture" | "lab";
  mounted?: boolean;
}

export const dynamic = "force-dynamic";

const TimeHighlight: React.FC<TimeHighlightProps> = ({
  time,
  usePolandTime = false,
  courseType = "lecture",
  mounted = true,
}) => {
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures we're running on the client
    setIsClient(true);
    const currentDate = new Date();
    const currentDayNumber = currentDate.getDay(); // 0-6, where 0 is Sunday
    setCurrentDay(currentDayNumber);
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

  const courseTime = getDisplayTime(time);

  // Only apply the dynamic styling on the client side
  const dayHighlightClass =
    isClient && currentDay === time.weekdayNumber
      ? "text-green-600"
      : "text-[#7A7266]";

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-[#7D98A1]">
        {courseType === "lecture" ? "Lecture" : "Lab"}
      </span>
      <span className={`text-sm text-right ${dayHighlightClass}`}>
        <p>{weekdays[time.weekdayNumber]} </p>
        {courseTime.time}
      </span>
    </div>
  );
};

export default TimeHighlight;
