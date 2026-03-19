/**
 * Converts minutes to milliseconds.
 *
 * @param minutes - Duration in minutes.
 * @returns Duration in milliseconds.
 *
 * @example
 * ```ts
 * const durationMs = minutesToMs(5); // 300000
 * ```
 */
export function minutesToMs(minutes: number): number {
	return minutes * 60 * 1000;
}
