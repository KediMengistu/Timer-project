export function extractUTCTime(timestamp: string): string {
  try {
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid timestamp format");
    }

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  } catch (error) {
    throw new Error(
      `Failed to extract time: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
