"use client";

import { selectSortedReadings } from "@/features/glucose/glucoseSelectors";
import { removeReading } from "@/features/glucose/glucoseSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import styles from "./GlucoseList.module.scss";

export function GlucoseList() {
	const dispatch = useAppDispatch();
	const readings = useAppSelector(selectSortedReadings).toReversed();

	return (
		<section className={styles.list}>
			<h2>Histórico</h2>

			{readings.length ? (
				<div className={styles.items}>
					{readings.map((reading) => (
						<article key={reading.id} className={styles.item}>
							<div>
								<strong>{reading.value} mg/dL</strong>
								<span>
									{new Date(
										reading.measuredAt,
									).toLocaleString("pt-BR")}
								</span>
								{reading.notes ? <p>{reading.notes}</p> : null}
							</div>

							<div className={styles.actions}>
								<StatusBadge status={reading.status} />
								<button
									type="button"
									onClick={() =>
										dispatch(removeReading(reading.id))
									}
								>
									Remover
								</button>
							</div>
						</article>
					))}
				</div>
			) : (
				<p className={styles.empty}>
					Nenhuma medição registrada ainda.
				</p>
			)}
		</section>
	);
}
