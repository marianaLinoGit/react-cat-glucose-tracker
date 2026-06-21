"use client";

import { addReading } from "@/features/glucose/glucoseSlice";
import { classifyGlucose } from "@/features/glucose/glucoseUtils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import styles from "./GlucoseForm.module.scss";

export function GlucoseForm() {
	const dispatch = useAppDispatch();
	const thresholds = useAppSelector((state) => state.glucose.thresholds);

	const [value, setValue] = useState("");
	const [measuredAt, setMeasuredAt] = useState("");
	const [notes, setNotes] = useState("");

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const glucoseValue = Number(value);

		if (!glucoseValue || !measuredAt) return;

		dispatch(
			addReading({
				id: uuid(),
				value: glucoseValue,
				measuredAt,
				notes,
				status: classifyGlucose(glucoseValue, thresholds),
			}),
		);

		setValue("");
		setMeasuredAt("");
		setNotes("");
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<h2>Nova medição</h2>

			<label>
				Valor da glicemia
				<input
					type="number"
					min="1"
					placeholder="Ex: 140"
					value={value}
					onChange={(event) => setValue(event.target.value)}
				/>
			</label>

			<label>
				Data e horário
				<input
					type="datetime-local"
					value={measuredAt}
					onChange={(event) => setMeasuredAt(event.target.value)}
				/>
			</label>

			<label>
				Observações
				<textarea
					placeholder="Ex: antes da alimentação, após insulina..."
					value={notes}
					onChange={(event) => setNotes(event.target.value)}
				/>
			</label>

			<button type="submit">Adicionar medição</button>
		</form>
	);
}
