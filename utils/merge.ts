export function mergeDescriptions(fields: Record<string, string>): string {
  return Object.values(fields) // Get values instead of keys
    .filter((value) => value.trim().length > 0) // Filter out empty strings
    .map((value) => `${value.trim().replace(/\.$/, "")}.`) // Add period at the end
    .join(" "); // Join all sentences together
}
