import { GlucoseStatus } from "@/features/glucose/glucoseTypes";
import { getStatusLabel } from "@/features/glucose/glucoseUtils";
import styles from "./StatusBadge.module.scss";

interface StatusBadgeProps {
	status: GlucoseStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
	return (
		<span className={`${styles.badge} ${styles[status]}`}>
			{getStatusLabel(status)}
		</span>
	);
}
