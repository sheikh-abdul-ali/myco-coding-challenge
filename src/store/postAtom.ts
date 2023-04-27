import { atom } from "recoil";

import { postsData } from "../data/postsData";
import { Post } from "../models/posts";

const localStorageEffect =
	key =>
	({ setSelf, onSet }) => {
		const savedValue = localStorage.getItem(key);
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue));
		}

		onSet((newValue, _, isReset) => {
			isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
		});
	};

export const postAtom = atom<Post[]>({
	key: "postList",
	default: [...postsData],
	effects: [localStorageEffect("post_list")]
});
