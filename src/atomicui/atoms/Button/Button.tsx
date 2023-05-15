import { ButtonHTMLAttributes, FC } from "react";

import styles from "./Button.module.css";

type btnSize = "sm" | "md" | "lg";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	name: string;
	handleClick?: () => void;
	isDisabled: boolean;
	size?: btnSize;
}

const Button: FC<IButtonProps> = ({ name, handleClick, isDisabled, size = "md", ...rest }) => {
	return (
		<button
			data-testid="button"
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
