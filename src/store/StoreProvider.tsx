"use client";

import {
	hydrateGlucoseState,
	markAsHydrated,
} from "@/features/glucose/glucoseSlice";
import { GlucoseState } from "@/features/glucose/glucoseTypes";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface StoreProviderProps {
	children: ReactNode;
}

const STORAGE_KEY = "nala-glucose-tracker";

export function StoreProvider({ children }: StoreProviderProps) {
	useEffect(() => {
		const storedState = localStorage.getItem(STORAGE_KEY);

		if (!storedState) {
			store.dispatch(markAsHydrated());
			return;
		}

		const parsedState = JSON.parse(storedState) as GlucoseState;
		store.dispatch(hydrateGlucoseState(parsedState));
	}, []);

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			const state = store.getState().glucose;

			if (!state.hydrated) return;

			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		});

		return unsubscribe;
	}, []);

	return <Provider store={store}>{children}</Provider>;
}
