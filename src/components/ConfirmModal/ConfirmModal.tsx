"use client";
import { AlertTriangle } from "lucide-react";
import { ReactNode } from "react";
import styles from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
	isOpen: boolean;
	title: string;
	description: ReactNode;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export function ConfirmModal({
	isOpen,
	title,
	description,
	confirmLabel = "Confirmar",
	cancelLabel = "Cancelar",
	onConfirm,
	onCancel,
}: ConfirmModalProps) {
	if (!isOpen) return null;

	return (
		<div className={styles.overlay} role="presentation" onClick={onCancel}>
			<div
				className={styles.modal}
				role="dialog"
				aria-modal="true"
				aria-labelledby="confirm-modal-title"
				onClick={(event) => event.stopPropagation()}
			>
				<h2 id="confirm-modal-title">
					<AlertTriangle size={20} />
					<span>Excluir medição?</span>
				</h2>
				<div className={styles.description}>{description}</div>

				<div className={styles.actions}>
					<button
						type="button"
						className={styles.cancel}
						onClick={onCancel}
					>
						{cancelLabel}
					</button>

					<button
						type="button"
						className={styles.confirm}
						onClick={onConfirm}
					>
						{confirmLabel}
					</button>
				</div>
			</div>
		</div>
	);
}
