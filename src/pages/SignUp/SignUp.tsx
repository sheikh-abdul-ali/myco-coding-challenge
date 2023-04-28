import { useMemo, useReducer } from "react";

import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { v4 as uuid } from "uuid";

import { ReactComponent as Logo } from "assets/logo.svg";

import badge from "../../assets/badge.svg";
import key from "../../assets/key.svg";
import mail from "../../assets/mail.svg";

import { addUserToList } from "../../data/usersData";
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
	const [state, dispatch] = useReducer(formReducer, initialFormState);
	const setUser = useSetRecoilState(userAtom);
	const navigate = useNavigate();

	const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
		if (password === confirmPassword) {
			const user = { id: uuid(), name, email, password };
			setUser(user);
			addUserToList(user);
			navigate("/");
		}
	};

	const validForm = useMemo(() => {
		const { name, email, password, confirmPassword } = state;
		return !!name && !!email && !!password && !!confirmPassword;
	}, [state]);

	return (
		<div className="box">
			<div className="signup-container">
				<Logo />
				<form className="form" onSubmit={handleSubmit}>
					<h1>Create Account</h1>
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
					<button type="submit" disabled={!validForm}>
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
