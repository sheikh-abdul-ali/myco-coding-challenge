import { FC, useMemo, useReducer, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import person from "assets/person.png";

import styles from "./SignIn.module.css";

import { Key, Mail } from "../../../assets";
import { getUsers } from "../../../data/usersData";
import { User } from "../../../models/user";
import { userAtom } from "../../../store/userAtom";
import { formReducer } from "../../../utils/formReducer";
import { Button } from "../../atoms/Button";

const initialFormState = {
	email: "",
	password: ""
};

const SignIn: FC = () => {
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

	const validForm = useMemo(() => {
		const { email, password } = state;
		return !!email && !!password;
	}, [state]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { email, password } = state;
		const user = getUsers().find((user: User) => user.email === email && user.password === password);
		if (!user) {
			return setErrorMessage("Incorrect email or password.");
		}
		setUser(user);
		navigate("/");
		return;
	};
	return (
		<div className={styles["signin-page"]}>
			<div className={styles["signin-container"]}>
				<img src={person} />
				<form className={styles["signin-form"]} onSubmit={handleSubmit}>
					<p className={styles["welcome-text"]}>Welcome Back!</p>
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

					{!!errorMessage && <p className={styles["error-text"]}>{errorMessage}</p>}
					<div className={styles["button-container"]}>
						<Button type="submit" isDisabled={!validForm} name={"Login"} size="lg" />
					</div>
					<div className={styles["register-text"]}>
						Not with us yet?&nbsp;
						<Link to="/signup" className={styles["register-span"]}>
							Register
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
