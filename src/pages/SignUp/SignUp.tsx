import { useMemo, useReducer, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { v4 as uuid } from "uuid";

import badge from "../../assets/badge.svg";
import person from "../../assets/icons8-person-80.png";
import key from "../../assets/key.svg";
import mail from "../../assets/mail.svg";

import { Button } from "../../components/Button";
import { addUserToList, getUsers } from "../../data/usersData";
import { userAtom } from "../../store/userAtom";

import "./SignUp.css";

const initialFormState = {
	name: "",
	email: "",
	password: "",
	confirmPassword: ""
};

const formReducer = (state, action) => {
	switch (action.type) {
		case "HANDLE INPUT TEXT":
			return {
				...state,
				[action.name]: action.payload
			};
	}
};

const SignUp = () => {
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
		//TODO: error handling
		const emailExist = getUsers().some(user => user.email === email);
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
		<div className="box">
			<div className="signup-container">
				<img src={person} />
				<form className="form" onSubmit={handleSubmit}>
					<p className="welcome-text">Let&#39;s Get Started!</p>
					<div className="input-container">
						<img src={mail} />
						<input
							className="input-field"
							required
							onChange={handleTextChange}
							type="email"
							placeholder="Email"
							name="email"
						/>
					</div>
					<div className="input-container">
						<img src={badge} />
						<input
							className="input-field"
							required
							onChange={handleTextChange}
							type="name"
							placeholder="Name"
							name="name"
						/>
					</div>
					<div className="input-container">
						<img src={key} />
						<input
							className="input-field"
							required
							onChange={handleTextChange}
							type="password"
							placeholder="Password"
							name="password"
						/>
					</div>
					<div className="input-container">
						<img src={key} />
						<input
							className="input-field"
							required
							onChange={handleTextChange}
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
						/>
					</div>
					{!!errorMessage && <p className="error-text">{errorMessage}</p>}
					<div className="button-container">
						<Button type="submit" isDisabled={!validForm} name={"Register"} size="lg" />
					</div>
					<div className="login-text">
						Already have an account?&nbsp;<Link to="/signin">Login</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
