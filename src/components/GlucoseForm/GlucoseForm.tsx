"use client";

import { addReading } from "@/features/glucose/glucoseSlice";
import { classifyGlucose } from "@/features/glucose/glucoseUtils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FormEvent, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styles from "./GlucoseForm.module.scss";

export function GlucoseForm() {
	const dispatch = useAppDispatch();
	const thresholds = useAppSelector((state) => state.glucose.thresholds);

	const [value, setValue] = useState("");
	const [measuredAt, setMeasuredAt] = useState("");
	const [notes, setNotes] = useState("");
	const [error, setError] = useState("");

	const [maxDateTime, setMaxDateTime] = useState("");

	useEffect(() => {
		setMaxDateTime(new Date().toISOString().slice(0, 16));
	}, []);

	const isFormInvalid = !value || !measuredAt;

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setError("");

		const glucoseValue = Number(value);
		const selectedDate = new Date(measuredAt);
		const now = new Date();

		if (!value || !measuredAt) {
			setError("Preencha o valor da glicemia e a data da medição.");
			return;
		}

		if (glucoseValue <= 0) {
			setError("Informe um valor de glicemia maior que zero.");
			return;
		}

		if (selectedDate > now) {
			setError("Não é permitido registrar medições em datas futuras.");
			return;
		}

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
				Valor da glicemia *
				<input
					type="number"
					min="1"
					placeholder="Ex: 140"
					value={value}
					onChange={(event) => setValue(event.target.value)}
					required
				/>
			</label>

			<label>
				Data e horário *
				<input
					type="datetime-local"
					max={maxDateTime}
					value={measuredAt}
					onChange={(event) => setMeasuredAt(event.target.value)}
					required
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

			{error ? <p className={styles.error}>{error}</p> : null}

			<button type="submit" disabled={isFormInvalid}>
				Adicionar medição
			</button>
		</form>
	);
}
