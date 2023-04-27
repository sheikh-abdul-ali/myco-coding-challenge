import { useId, useMemo, useReducer } from "react";

import { useSetRecoilState } from "recoil";

import key from "../../assets/key.svg";
import mail from "../../assets/mail.svg";

import { usersData } from "../../data/usersData";
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
	const id = useId();
	const [state, dispatch] = useReducer(formReducer, initialFormState);
	const setUser = useSetRecoilState(userAtom);

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
			const user = { id, name, email, password };
			setUser(user);
			usersData.push(user);
		}
	};

	const validForm = useMemo(() => {
		const { name, email, password, confirmPassword } = state;
		return !!name && !!email && !!password && !!confirmPassword;
	}, [state]);

	return (
		<div className="box">
			<div className="signup-container">
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
						<img src={mail} />
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
