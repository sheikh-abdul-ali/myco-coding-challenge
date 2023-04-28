import { DefaultValue } from "recoil";

type OnSet<T> = (callback: (newValue: T | DefaultValue, oldValue: T | DefaultValue, isReset: boolean) => void) => void;

export const localStorageEffect =
	<T>(key: string) =>
	({ setSelf, onSet }: { setSelf: (value: T | DefaultValue) => void; onSet: OnSet<T> }) => {
		const savedValue = localStorage.getItem(key);
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue));
		}

		onSet((newValue, _, isReset) => {
			isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
		});
	};
