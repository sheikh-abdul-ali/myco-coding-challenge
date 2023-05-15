import { FC, ReactNode } from "react";

import { Close } from "assets";

import styles from "./Modal.module.css";

interface IModalProps {
	children: ReactNode;
	title: string;
	onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, title, onClose }) => {
	return (
		<div data-testid="modal" className={styles["modal"]}>
			<div className={styles["modal-content"]}>
				<div className={styles["modal-header"]}>
					<div data-testid="modal-title" className={styles["modal-title"]}>
						{title}
					</div>
					<div data-testid="modal-close" onClick={onClose}>
						<Close className={styles["close-icon"]} />
					</div>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
