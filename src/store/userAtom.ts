import { DefaultValue, RecoilState, atom } from "recoil";

import { User } from "../models/user";

export function localStorageEffect<T>(key: string, defaultValue?: T) {
	return ({ setSelf }: { setSelf: (value: T | DefaultValue) => void; onSet: unknown; node: RecoilState<T> }) => {
		const storedValue = localStorage.getItem(key);

		if (storedValue !== null) {
			setSelf(JSON.parse(storedValue) as T);
		} else if (defaultValue !== undefined) {
			setSelf(defaultValue);
		}

		return () => {
			// Cleanup function to remove the value from localStorage when the component unmounts
			localStorage.removeItem(key);
		};
	};
}

export const userAtom = atom<User>({
	key: "user",
	default: { email: "", name: "", password: "", id: "" },
	effects: [localStorageEffect("current_user")]
});
