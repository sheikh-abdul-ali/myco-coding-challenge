import React, { FC, useMemo, useReducer, useRef } from "react";

import { Button } from "atomicui/atoms/Button";
import { Modal } from "atomicui/atoms/Modal";
import dayjs from "dayjs";
import useAutosizeTextArea from "hooks/useAutosizeTextArea";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { postAtom } from "store/postAtom";
import { userAtom } from "store/userAtom";
import { v4 as uuid } from "uuid";

import { formReducer } from "utils/formReducer";

import styles from "./CreatePost.module.css";

interface ICreatePostProps {
	onClose: () => void;
}

const initialFormState = {
	title: "",
	content: "",
	userId: "",
	comments: []
};

const CreatePost: FC<ICreatePostProps> = ({ onClose }) => {
	const [state, dispatch] = useReducer(formReducer, initialFormState);
	const setPosts = useSetRecoilState(postAtom);
	const user = useRecoilValue(userAtom);

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useAutosizeTextArea(textAreaRef.current, state.title);

	const handleTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch({
			type: "HANDLE INPUT TEXT",
			name: evt.target.name,
			payload: evt.target.value
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPosts(oldPosts => [{ ...state, userId: user.id, id: uuid(), createdAt: dayjs().toISOString() }, ...oldPosts]);
		onClose();
	};

	const validForm = useMemo(() => {
		const { title, content } = state;
		return !!title && !!content;
	}, [state]);

	return (
		<Modal title="Create Post" onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<div className={styles["textarea-wrapper"]}>
					<textarea
						className={styles["title"]}
						name="title"
						onChange={handleTextChange}
						ref={textAreaRef}
						rows={1}
						placeholder="Title (optional)"
						maxLength={255}
					></textarea>
					<textarea
						className={styles["post"]}
						onChange={handleTextChange}
						name="content"
						rows={20}
						placeholder="Write something..."
					></textarea>
				</div>
				<div className={styles["modal-footer"]}>
					<Button name="Publish post" type="submit" isDisabled={!validForm} size="sm" />
				</div>
			</form>
		</Modal>
	);
};

export default CreatePost;
