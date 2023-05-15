import { postsData } from "data/postsData";
import { Post } from "models/posts";
import { atom } from "recoil";

import { localStorageEffect } from "utils/localStorageEffect";

export const postAtom = atom<Post[]>({
	key: "postList",
	default: [...postsData],
	effects: [localStorageEffect("post_list")]
});
