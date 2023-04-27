import "./Modal.css";

import close from "./../../assets/close.svg";

const Modal = ({ children, title, onClose }) => {
	return (
		<div className="modal" id="modal">
			<div className="modal-content">
				<div className="modal-header">
					<h2>{title}</h2>
					<img src={close} style={{ cursor: "pointer" }} onClick={onClose} />
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
