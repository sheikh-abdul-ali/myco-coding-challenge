import { FC } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";

interface IHeaderProp {
	buttonName: string;
	onBtnClick: () => void;
}

const Header: FC<IHeaderProp> = ({ buttonName, onBtnClick }) => {
	return (
		<header className={styles["header"]}>
			<div className={styles["header-container"]}>
				<div className={styles["header-subcontainer"]}>
					<button className={styles["header-button"]} onClick={onBtnClick}>
						{buttonName}
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
