export function extractAmPm(timestamp: string): string {
  try {
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid timestamp format");
    }

    const hours = date.getUTCHours();

    return hours < 12 ? "AM" : "PM";
  } catch (error) {
    throw new Error(
      `Failed to extract AM/PM: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
