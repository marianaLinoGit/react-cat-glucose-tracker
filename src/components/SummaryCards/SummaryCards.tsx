"use client";

import {
	selectAverageGlucose,
	selectLatestReading,
	selectReadings,
} from "@/features/glucose/glucoseSelectors";
import { getStatusLabel } from "@/features/glucose/glucoseUtils";
import { useAppSelector } from "@/store/hooks";
import styles from "./SummaryCards.module.scss";

export function SummaryCards() {
	const readings = useAppSelector(selectReadings);
	const latestReading = useAppSelector(selectLatestReading);
	const average = useAppSelector(selectAverageGlucose);

	const highest = readings.length
		? Math.max(...readings.map((reading) => reading.value))
		: 0;
	const lowest = readings.length
		? Math.min(...readings.map((reading) => reading.value))
		: 0;

	return (
		<section className={styles.cards}>
			<article>
				<span>Última medição</span>
				<strong>
					{latestReading ? `${latestReading.value} mg/dL` : "-"}
				</strong>
				<small>
					{latestReading
						? getStatusLabel(latestReading.status)
						: "Sem dados"}
				</small>
			</article>

			<article>
				<span>Média</span>
				<strong>{average ? `${average} mg/dL` : "-"}</strong>
				<small>Considerando todos os registros</small>
			</article>

			<article>
				<span>Menor valor</span>
				<strong>{lowest ? `${lowest} mg/dL` : "-"}</strong>
				<small>Menor registro</small>
			</article>

			<article>
				<span>Maior valor</span>
				<strong>{highest ? `${highest} mg/dL` : "-"}</strong>
				<small>Pico registrado</small>
			</article>
		</section>
	);
}
