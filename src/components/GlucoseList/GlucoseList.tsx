"use client";

import { selectSortedReadings } from "@/features/glucose/glucoseSelectors";
import { removeReading, updateReading } from "@/features/glucose/glucoseSlice";
import { GlucoseReading } from "@/features/glucose/glucoseTypes";
import { classifyGlucose } from "@/features/glucose/glucoseUtils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import styles from "./GlucoseList.module.scss";

export function GlucoseList() {
	const dispatch = useAppDispatch();
	const readings = useAppSelector(selectSortedReadings).toReversed();
	const thresholds = useAppSelector((state) => state.glucose.thresholds);

	const [editingId, setEditingId] = useState<string | null>(null);
	const [editingValue, setEditingValue] = useState("");
	const [editingMeasuredAt, setEditingMeasuredAt] = useState("");
	const [editingNotes, setEditingNotes] = useState("");
	const [readingToRemove, setReadingToRemove] =
		useState<GlucoseReading | null>(null);
	const [error, setError] = useState("");

	const [maxDateTime, setMaxDateTime] = useState("");

	useEffect(() => {
		setMaxDateTime(new Date().toISOString().slice(0, 16));
	}, []);

	const handleEdit = (reading: GlucoseReading) => {
		setEditingId(reading.id);
		setEditingValue(String(reading.value));
		setEditingMeasuredAt(reading.measuredAt);
		setEditingNotes(reading.notes ?? "");
		setError("");
	};

	const handleCancel = () => {
		setEditingId(null);
		setEditingValue("");
		setEditingMeasuredAt("");
		setEditingNotes("");
		setError("");
	};

	const handleSave = (reading: GlucoseReading) => {
		const glucoseValue = Number(editingValue);
		const selectedDate = new Date(editingMeasuredAt);
		const now = new Date();

		setError("");

		if (!editingValue || !editingMeasuredAt) {
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
			updateReading({
				...reading,
				value: glucoseValue,
				measuredAt: editingMeasuredAt,
				notes: editingNotes,
				status: classifyGlucose(glucoseValue, thresholds),
			}),
		);

		handleCancel();
	};

	const handleConfirmRemove = () => {
		if (!readingToRemove) return;

		dispatch(removeReading(readingToRemove.id));
		setReadingToRemove(null);
	};

	return (
		<>
			<section className={styles.list}>
				<h2>Histórico</h2>

				{readings.length ? (
					<div className={styles.items}>
						{readings.map((reading) => {
							const isEditing = editingId === reading.id;

							return (
								<article
									key={reading.id}
									className={styles.item}
								>
									{isEditing ? (
										<div className={styles.editForm}>
											<label>
												Valor da glicemia *
												<input
													type="number"
													min="1"
													value={editingValue}
													onChange={(event) =>
														setEditingValue(
															event.target.value,
														)
													}
												/>
											</label>

											<label>
												Data e horário *
												<input
													type="datetime-local"
													max={maxDateTime}
													value={editingMeasuredAt}
													onChange={(event) =>
														setEditingMeasuredAt(
															event.target.value,
														)
													}
												/>
											</label>

											<label>
												Observações
												<textarea
													value={editingNotes}
													onChange={(event) =>
														setEditingNotes(
															event.target.value,
														)
													}
												/>
											</label>

											{error ? (
												<p className={styles.error}>
													{error}
												</p>
											) : null}

											<div className={styles.actions}>
												<button
													type="button"
													className={
														styles.saveButton
													}
													onClick={() =>
														handleSave(reading)
													}
												>
													<Check size={16} />
													<span>Salvar</span>
												</button>

												<button
													type="button"
													className={
														styles.cancelButton
													}
													onClick={handleCancel}
												>
													<X size={16} />
													<span>Cancelar</span>
												</button>
											</div>
										</div>
									) : (
										<>
											<div className={styles.content}>
												<div className={styles.header}>
													<strong>
														{reading.value} mg/dL
													</strong>

													<StatusBadge
														status={reading.status}
													/>
												</div>

												<span>
													{new Date(
														reading.measuredAt,
													).toLocaleString("pt-BR")}
												</span>

												{reading.notes ? (
													<p>{reading.notes}</p>
												) : null}
											</div>

											<div className={styles.actions}>
												<button
													type="button"
													className={
														styles.editButton
													}
													onClick={() =>
														handleEdit(reading)
													}
												>
													<Pencil size={16} />
													<span>Editar</span>
												</button>

												<button
													type="button"
													className={
														styles.deleteButton
													}
													onClick={() =>
														setReadingToRemove(
															reading,
														)
													}
												>
													<Trash2 size={16} />
													<span>Remover</span>
												</button>
											</div>
										</>
									)}
								</article>
							);
						})}
					</div>
				) : (
					<p className={styles.empty}>
						Nenhuma medição registrada ainda.
					</p>
				)}
			</section>

			<ConfirmModal
				isOpen={!!readingToRemove}
				title="Excluir medição?"
				description={
					readingToRemove ? (
						<>
							<p>
								Você está prestes a excluir a medição de{" "}
								<strong>{readingToRemove.value} mg/dL</strong>{" "}
								registrada em{" "}
								<strong>
									{new Date(
										readingToRemove.measuredAt,
									).toLocaleDateString("pt-BR")}
								</strong>
								.
							</p>

							<p>
								<em>Essa ação não poderá ser desfeita.</em>
							</p>
						</>
					) : null
				}
				confirmLabel="Excluir"
				cancelLabel="Cancelar"
				onConfirm={handleConfirmRemove}
				onCancel={() => setReadingToRemove(null)}
			/>
		</>
	);
}
