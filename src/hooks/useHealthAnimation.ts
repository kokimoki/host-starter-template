import { useEffect, useRef, useState } from 'react';

/**
 * Hook to trigger animations when a value changes
 * @param value - The value to watch for changes
 * @param options - Configuration options for animation durations
 * @param options.damageDuration - Duration in milliseconds for damage animation (default: 750ms)
 * @param options.healDuration - Duration in milliseconds for heal animation (default: 1500ms)
 * @returns Object with isDamaged and isHealing booleans
 */
export function useHealthAnimation(
	value: number,
	options: { damageDuration?: number; healDuration?: number } = {}
) {
	const { damageDuration = 750, healDuration = 2000 } = options;
	const [isDamaged, setIsDamaged] = useState(false);
	const [isHealing, setIsHealing] = useState(false);
	const previousValueRef = useRef(value);
	const damageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const healTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		// Check if value has decreased (damage taken)
		if (value < previousValueRef.current) {
			// Clear any existing timeout
			if (damageTimeoutRef.current) {
				clearTimeout(damageTimeoutRef.current);
			}

			// Trigger damage animation
			setIsDamaged(true);

			// Remove animation class after duration
			damageTimeoutRef.current = setTimeout(() => {
				setIsDamaged(false);
				damageTimeoutRef.current = null;
			}, damageDuration);
		}
		// Check if value has increased (healing)
		else if (value > previousValueRef.current) {
			// Clear any existing timeout
			if (healTimeoutRef.current) {
				clearTimeout(healTimeoutRef.current);
			}

			// Trigger heal animation
			setIsHealing(true);

			// Remove animation class after duration
			healTimeoutRef.current = setTimeout(() => {
				setIsHealing(false);
				healTimeoutRef.current = null;
			}, healDuration);
		}

		// Update previous value
		previousValueRef.current = value;
	}, [value, damageDuration, healDuration]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (damageTimeoutRef.current) {
				clearTimeout(damageTimeoutRef.current);
			}
			if (healTimeoutRef.current) {
				clearTimeout(healTimeoutRef.current);
			}
		};
	}, []);

	return { isDamaged, isHealing };
}
