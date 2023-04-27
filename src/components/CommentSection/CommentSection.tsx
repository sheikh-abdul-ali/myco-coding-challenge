import { useId, useRef, useState } from "react";

import { useRecoilValue } from "recoil";

import { v4 as uuidv4 } from "uuid";

import avatar from "../../assets/avatar.png";
import comment from "../../assets/comment.svg";
import { usersData } from "../../data/usersData";
import { userAtom } from "../../store/userAtom";
import useAutosizeTextArea from "../Modal/useAutosizeTextArea";

import "./CommentSection.css";

const CommentSection = ({ comments, addCommentToPost, postId }) => {
	const [showComments, setShowComments] = useState<boolean>(false);
	const [commentText, setCommentText] = useState<string>("");
	const user = useRecoilValue(userAtom);

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useAutosizeTextArea(textAreaRef.current, commentText);
	console.log(commentText);

	const handleTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCommentText(evt.target.value);
	};

	const handleClick = () => setShowComments(true);
	const handleSubmit = () => {
		addCommentToPost(postId, { id: uuidv4(), content: commentText, userId: user.id });
		setCommentText("");
	};

	return (
		<div className="comment-container">
			<div className="comment-header">
				<div className="comment-button" onClick={handleClick}>
					<img src={comment} />
					<p>Comment</p>
				</div>
				<div className="">0 comments</div>
			</div>
			{!!showComments &&
				comments.map(({ id, content, userId }) => {
					const user = usersData.find(user => user.id === userId);
					console.log("🚀 ~ file: CommentSection.tsx:45 ~ comments.map ~ usersData:", usersData);

					return (
						<div className="comment" key={id}>
							<div className="comment-avatar">
								<img src={avatar} className="comment-picture" />
							</div>
							<div className="comment-body">
								<div className="comment-metadata">
									<h4>{user?.name}</h4>
									<p>a year ago</p>
								</div>
								<div className="comment-text">{content}</div>
							</div>
						</div>
					);
				})}

			{!!showComments && (
				<div className="comment">
					<div className="comment-avatar">
						<img src={avatar} className="comment-picture" />
					</div>
					<div className="comment-textarea-wrapper">
						<textarea
							className="comment-input"
							name="content"
							onChange={handleTextChange}
							ref={textAreaRef}
							value={commentText}
							rows={1}
							placeholder="What are your thoughts?"
						></textarea>
						<div className="button-wrapper">
							<button onClick={handleSubmit}>Post</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentSection;
