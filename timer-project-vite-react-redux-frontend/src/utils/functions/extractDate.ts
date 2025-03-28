export function extractDate(timestamp: string): string {
  try {
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid timestamp format");
    }

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    throw new Error(
      `Failed to extract date: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
