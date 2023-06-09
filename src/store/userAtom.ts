import { User } from "models/user";
import { atom } from "recoil";

import { localStorageEffect } from "utils/localStorageEffect";

export const userAtom = atom<User>({
	key: "user",
	default: { email: "", name: "", password: "", id: "" },
	effects: [localStorageEffect("current_user")]
});
