import { FC, useMemo, useReducer, useState } from "react";

import { Badge, Key, Mail } from "assets";
import { Button } from "atomicui/atoms/Button";
import { addUserToList, getUsers } from "data/usersData";
import { User } from "models/user";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "store/userAtom";
import { v4 as uuid } from "uuid";

import person from "assets/person.png";

import { formReducer } from "utils/formReducer";

import styles from "./SignUp.module.css";

const initialFormState = {
	name: "",
	email: "",
	password: "",
	confirmPassword: ""
};

const SignUp: FC = () => {
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [state, dispatch] = useReducer(formReducer, initialFormState);
	const setUser = useSetRecoilState(userAtom);
	const navigate = useNavigate();

	const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		if (errorMessage) setErrorMessage("");

		dispatch({
			type: "HANDLE INPUT TEXT",
			name: evt.target.name,
			payload: evt.target.value
		});
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { name, email, password, confirmPassword } = state;
		const emailExist = getUsers().some((user: User) => user.email === email);
		if (emailExist) {
			return setErrorMessage("Email already exists. Please try logging in.");
		}
		if (password === confirmPassword) {
			const user = { id: uuid(), name, email, password };
			setUser(user);
			addUserToList(user);
			navigate("/");
			return;
		}
		return setErrorMessage("Passwords didn't match");
	};

	const validForm = useMemo(() => {
		const { name, email, password, confirmPassword } = state;
		return !!name && !!email && !!password && !!confirmPassword;
	}, [state]);

	return (
		<div className={styles["signup-page"]}>
			<div className={styles["signup-container"]}>
				<img src={person} />
				<form className={styles["signup-form"]} onSubmit={handleSubmit}>
					<p className={styles["welcome-text"]}>Let&#39;s Get Started!</p>
					<div className={styles["input-container"]}>
						<Mail />
						<input
							className={styles["input-field"]}
							required
							onChange={handleTextChange}
							type="email"
							placeholder="Email"
							name="email"
						/>
					</div>
					<div className={styles["input-container"]}>
						<Badge />
						<input
							className={styles["input-field"]}
							required
							onChange={handleTextChange}
							type="name"
							placeholder="Name"
							name="name"
						/>
					</div>
					<div className={styles["input-container"]}>
						<Key />
						<input
							className={styles["input-field"]}
							required
							onChange={handleTextChange}
							type="password"
							placeholder="Password"
							name="password"
						/>
					</div>
					<div className={styles["input-container"]}>
						<Key />
						<input
							className={styles["input-field"]}
							required
							onChange={handleTextChange}
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
						/>
					</div>
					{!!errorMessage && <p className={styles["error-text"]}>{errorMessage}</p>}
					<div className={styles["button-container"]}>
						<Button type="submit" isDisabled={!validForm} name={"Register"} size="lg" />
					</div>
					<div className={styles["login-text"]}>
						Already have an account?&nbsp;
						<Link to="/signin" className={styles["login-span"]}>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
