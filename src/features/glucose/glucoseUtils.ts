import {
	GlucoseReading,
	GlucoseStatus,
	GlucoseThresholds,
} from "./glucoseTypes";

export const defaultThresholds: GlucoseThresholds = {
	low: 80,
	high: 180,
	veryHigh: 300,
};

export const classifyGlucose = (
	value: number,
	thresholds: GlucoseThresholds,
): GlucoseStatus => {
	if (value < thresholds.low) return "low";
	if (value >= thresholds.veryHigh) return "veryHigh";
	if (value > thresholds.high) return "high";

	return "normal";
};

export const sortReadingsByDate = (readings: GlucoseReading[]) => {
	return [...readings].sort(
		(a, b) =>
			new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime(),
	);
};

export const getStatusLabel = (status: GlucoseStatus) => {
	const labels: Record<GlucoseStatus, string> = {
		low: "Baixa",
		normal: "Normal",
		high: "Alta",
		veryHigh: "Muito alta",
	};

	return labels[status];
};
