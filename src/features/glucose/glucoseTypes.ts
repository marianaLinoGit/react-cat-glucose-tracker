export type GlucoseStatus = "low" | "normal" | "high" | "veryHigh";

export interface GlucoseReading {
	id: string;
	measuredAt: string;
	value: number;
	notes?: string;
	status: GlucoseStatus;
}

export interface GlucoseThresholds {
	low: number;
	high: number;
	veryHigh: number;
}

export interface GlucoseState {
	readings: GlucoseReading[];
	thresholds: GlucoseThresholds;
	hydrated: boolean;
}
