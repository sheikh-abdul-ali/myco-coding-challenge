import { User } from "../models/user";

const usersData: User[] = [
	{
		id: "1",
		name: "Sheikh Abdul Ali",
		email: "shaikhabdulali@google.com",
		password: "abcd123"
	},
	{ id: "2", name: "John Doe", email: "johndoe@google.com", password: "abcd123" }
];

export const addUserToList = (user: User) => {
	const savedValue = localStorage.getItem("users_list");
	if (savedValue != null) {
		const users = JSON.parse(savedValue);
		users.push(user);
		localStorage.setItem("users_list", JSON.stringify(users));
		return;
	}
	usersData.push(user);
	return localStorage.setItem("users_list", JSON.stringify(usersData));
};

export const getUsers = () => {
	const savedValue = localStorage.getItem("users_list");
	if (savedValue === null) {
		localStorage.setItem("users_list", JSON.stringify(usersData));
		return usersData;
	}
	return JSON.parse(savedValue);
};
