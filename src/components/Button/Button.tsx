import { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.css";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	name: string;
	handleClick?: () => void;
	isDisabled: boolean;
}

const Button = ({ name, handleClick, isDisabled, ...rest }: IButtonProps) => {
	return (
		<button className={styles.button} onClick={handleClick} disabled={isDisabled} {...rest}>
			{name}
		</button>
	);
};

export default Button;
