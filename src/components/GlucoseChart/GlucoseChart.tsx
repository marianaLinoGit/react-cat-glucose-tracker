"use client";

import { selectSortedReadings } from "@/features/glucose/glucoseSelectors";
import { useAppSelector } from "@/store/hooks";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import styles from "./GlucoseChart.module.scss";

export function GlucoseChart() {
	const readings = useAppSelector(selectSortedReadings);

	const data = readings.map((reading) => ({
		date: new Date(reading.measuredAt).toLocaleString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		}),
		value: reading.value,
	}));

	return (
		<section className={styles.chart}>
			<div className={styles.header}>
				<h2>Evolução da glicemia</h2>
				<span>mg/dL</span>
			</div>

			{data.length ? (
				<ResponsiveContainer width="100%" height={320}>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Line type="monotone" dataKey="value" strokeWidth={3} />
					</LineChart>
				</ResponsiveContainer>
			) : (
				<p className={styles.empty}>
					Adicione uma medição para visualizar o gráfico.
				</p>
			)}
		</section>
	);
}
