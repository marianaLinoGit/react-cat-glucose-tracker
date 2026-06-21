import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlucoseReading, GlucoseState } from "./glucoseTypes";
import { defaultThresholds } from "./glucoseUtils";

const initialState: GlucoseState = {
	readings: [],
	thresholds: defaultThresholds,
	hydrated: false,
};

const glucoseSlice = createSlice({
	name: "glucose",
	initialState,
	reducers: {
		hydrateGlucoseState: (_, action: PayloadAction<GlucoseState>) => {
			return {
				...action.payload,
				hydrated: true,
			};
		},
		markAsHydrated: (state) => {
			state.hydrated = true;
		},
		addReading: (state, action: PayloadAction<GlucoseReading>) => {
			state.readings.push(action.payload);
		},
		updateReading: (state, action: PayloadAction<GlucoseReading>) => {
			const index = state.readings.findIndex(
				(reading) => reading.id === action.payload.id,
			);

			if (index >= 0) {
				state.readings[index] = action.payload;
			}
		},
		removeReading: (state, action: PayloadAction<string>) => {
			state.readings = state.readings.filter(
				(reading) => reading.id !== action.payload,
			);
		},
		clearReadings: (state) => {
			state.readings = [];
		},
	},
});

export const {
	hydrateGlucoseState,
	markAsHydrated,
	addReading,
	updateReading,
	removeReading,
	clearReadings,
} = glucoseSlice.actions;

export const glucoseReducer = glucoseSlice.reducer;
