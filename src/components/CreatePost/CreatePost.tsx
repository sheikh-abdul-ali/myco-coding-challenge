import React, { useId, useMemo, useReducer, useRef } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";

import { v4 as uuid } from "uuid";

import { postsData } from "../../data/postsData";
import { postAtom } from "../../store/postAtom";

import { userAtom } from "../../store/userAtom";
import Modal from "../Modal/Modal";
import useAutosizeTextArea from "../Modal/useAutosizeTextArea";

import "./CreatePost.css";

const initialFormState = {
	title: "",
	content: "",
	userId: "",
	comments: []
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

const CreatePost = ({ onClose }) => {
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

	//TODO: Convert to Usecallback
	const handleSubmit = event => {
		event.preventDefault();
		setPosts(oldPosts => [...oldPosts, { id: uuid, ...state, userId: user.id }]);
		postsData.push({ id: uuid, ...state, userId: user.id });
		console.log(postsData);
		onClose();
	};

	const validForm = useMemo(() => {
		const { title, content } = state;
		return !!title && !!content;
	}, [state]);
	return (
		<Modal title="Create Post" onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<div className="textarea-wrapper">
					<textarea
						className="title"
						name="title"
						onChange={handleTextChange}
						ref={textAreaRef}
						rows={1}
						placeholder="Title (optional)"
						maxLength={255}
					></textarea>
					<textarea
						className="post"
						onChange={handleTextChange}
						name="content"
						rows={20}
						placeholder="Write something..."
					></textarea>
				</div>
				<div className="modal-footer">
					<button type="submit" disabled={!validForm}>
						Publish post
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default CreatePost;
