export const convertToLocalTime = (time: { hour: number; min: number; weekday: string }): string => {
  try {
    const now = new Date();
    const localTimezoneOffset = now.getTimezoneOffset(); // Offset in minutes relative to UTC
    const polandTimezoneOffset = 120; // Poland is typically GMT+2 (120 minutes)
    const timezoneOffsetDifference = -(
      localTimezoneOffset + polandTimezoneOffset
    );
    let localHours = time.hour + timezoneOffsetDifference / 60;
    

    // Adjust for day change if hours overflow/underflow
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

// Format time as Weekday HH:MM
export const formatTime = (time: { hour: number; min: number }): string => {
  const formattedHours = time.hour.toString().padStart(2, "0");
  const formattedMinutes = time.min.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
}; 