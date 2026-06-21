import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";
import { sortReadingsByDate } from "./glucoseUtils";

export const selectGlucoseState = (state: RootState) => state.glucose;

export const selectReadings = (state: RootState) => state.glucose.readings;

export const selectSortedReadings = createSelector(
	[selectReadings],
	(readings) => sortReadingsByDate(readings),
);

export const selectLatestReading = (state: RootState) => {
	const sortedReadings = sortReadingsByDate(state.glucose.readings);

	return sortedReadings.at(-1);
};

export const selectAverageGlucose = (state: RootState) => {
	const readings = state.glucose.readings;

	if (!readings.length) return 0;

	const total = readings.reduce((sum, reading) => sum + reading.value, 0);

	return Math.round(total / readings.length);
};
