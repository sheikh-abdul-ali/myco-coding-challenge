import { FC, ReactNode } from "react";

import styles from "./Modal.module.css";

import { Close } from "../../../assets";

interface IModalProps {
	children: ReactNode;
	title: string;
	onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, title, onClose }) => {
	return (
		<div className={styles["modal"]}>
			<div className={styles["modal-content"]}>
				<div className={styles["modal-header"]}>
					<div className={styles["modal-title"]}>{title}</div>
					<Close className={styles["close-icon"]} onClick={onClose} />
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
