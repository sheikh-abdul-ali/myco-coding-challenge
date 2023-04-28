import { FC, useMemo, useRef, useState } from "react";

import dayjs from "dayjs";
import { useRecoilValue } from "recoil";

import { v4 as uuid } from "uuid";

import styles from "./CommentSection.module.css";

import { CommentBox } from "../../../assets";
import avatar from "../../../assets/avatar.png";
import { getUsers } from "../../../data/usersData";
import useAutosizeTextArea from "../../../hooks/useAutosizeTextArea";
import { Comment as CommentModel } from "../../../models/comment";
import { User } from "../../../models/user";
import { userAtom } from "../../../store/userAtom";
import { Button } from "../../atoms/Button";
import { Comment } from "../Comment";

interface ICommentSectionProps {
	comments: CommentModel[];
	postId: string;
	addCommentToPost: (postId: string, comment: CommentModel) => void;
}

const CommentSection: FC<ICommentSectionProps> = ({ comments, addCommentToPost, postId }) => {
	const [showComments, setShowComments] = useState<boolean>(false);
	const [commentText, setCommentText] = useState<string>("");
	const user = useRecoilValue(userAtom);

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useAutosizeTextArea(textAreaRef.current, commentText);

	const handleTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCommentText(evt.target.value);
	};

	const handleClick = () => setShowComments(!showComments);
	const handleSubmit = () => {
		addCommentToPost(postId, { id: uuid(), content: commentText, userId: user.id, createdAt: dayjs().toISOString() });
		setCommentText("");
	};

	const showCommentBlock = useMemo(
		() =>
			comments.map(({ id, content, userId, createdAt }: CommentModel) => {
				const user = getUsers().find((user: User) => user.id === userId);
				return <Comment key={id} content={content} name={user.name} createdAt={createdAt} />;
			}),
		[comments]
	);

	return (
		<div className={styles["comment-container"]}>
			<div className={styles["comment-header"]}>
				<div className={styles["comment-button"]} onClick={handleClick}>
					<CommentBox />
					<p>Comment</p>
				</div>
				<div>
					{comments.length} {comments.length === 1 ? " comment" : " comments"}
				</div>
			</div>
			{!!showComments && showCommentBlock}

			{!!showComments && !!user.id && (
				<div className={styles["comment"]}>
					<div>
						<img src={avatar} className={styles["comment-picture"]} />
					</div>
					<div className={styles["comment-textarea-wrapper"]}>
						<textarea
							className={styles["comment-input"]}
							name="content"
							onChange={handleTextChange}
							ref={textAreaRef}
							value={commentText}
							rows={1}
							placeholder="What are your thoughts?"
						></textarea>
						<div className={styles["button-wrapper"]}>
							<Button name="Post" handleClick={handleSubmit} isDisabled={!commentText} size="sm" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentSection;
