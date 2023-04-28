import { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.css";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	name: string;
	handleClick?: () => void;
	isDisabled: boolean;
	size: string;
}

const Button = ({ name, handleClick, isDisabled, size, ...rest }: IButtonProps) => {
	return (
		<button
			className={size === "lg" ? styles["button-lg"] : styles.button}
			onClick={handleClick}
			disabled={isDisabled}
			{...rest}
		>
			{name}
		</button>
	);
};

export default Button;
