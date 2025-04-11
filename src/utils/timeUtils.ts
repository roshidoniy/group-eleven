export const convertToLocalTime = (time: {
  hour: number;
  min: number;
  weekdayNumber: number;
}): { time: string; weekdayNumber: number } => {
  try {
    const now = new Date();
    const localTimezoneOffset = now.getTimezoneOffset(); // Offset in minutes relative to UTC
    const polandTimezoneOffset = 120; // Poland is typically GMT+2 (120 minutes)
    const timezoneOffsetDifference = -(
      localTimezoneOffset + polandTimezoneOffset
    );
    let localHours = time.hour + timezoneOffsetDifference / 60;

    // Calculate day change based on time difference
    let dayChange = 0;
    if (localHours < 0) {
      localHours += 24;
      dayChange = -1; // Move to previous day
    } else if (localHours >= 24) {
      localHours -= 24;
      dayChange = 1; // Move to next day
    }

    // Calculate new weekday number (0-6, where 0 is Monday)
    const newWeekdayNumber = (time.weekdayNumber + dayChange + 7) % 7;

    const formattedHours = Math.floor(localHours).toString().padStart(2, "0");
    const formattedMinutes = time.min.toString().padStart(2, "0");

    return {
      time: `${formattedHours}:${formattedMinutes}`,
      weekdayNumber: newWeekdayNumber,
    };
  } catch (error) {
    console.error("Error converting time:", error);
    return { time: "Invalid Time", weekdayNumber: time.weekdayNumber };
  }
};

// Format time as HH:MM
export const formatTime = (time: { hour: number; min: number }): string => {
  const formattedHours = time.hour.toString().padStart(2, "0");
  const formattedMinutes = time.min.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};

export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
