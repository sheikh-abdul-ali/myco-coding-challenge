import { FC } from "react";

import styles from "./PostContainer.module.css";

import avatar from "../../../assets/avatar.png";
import { Comment } from "../../../models/comment";
import { timeFromNow } from "../../../utils/timeFromNow";
import { CommentSection } from "../../molecules/CommentSection";

interface IPostContainerProps {
	postId: string;
	title: string;
	content: string;
	name: string;
	createdAt: string;
	comments: Comment[];
	addCommentToPost: (postId: string, comment: Comment) => void;
}

const PostContainer: FC<IPostContainerProps> = ({
	postId,
	title,
	content,
	name,
	createdAt,
	comments,
	addCommentToPost
}) => {
	return (
		<div className={styles["post-container"]}>
			<div className={styles["post-subcontainer"]}>
				<div className={styles["post-metadata"]}>
					<img src={avatar} className={styles["post-picture"]} />
					<div className={styles["post-name"]}>{name}</div>
					<div className={styles["post-time"]}>{timeFromNow(createdAt)}</div>
				</div>
				<div className={styles["post-title"]}>{title}</div>
				<div className={styles["post-content"]}>{content}</div>
			</div>
			<CommentSection comments={comments} addCommentToPost={addCommentToPost} postId={postId} />
		</div>
	);
};

export default PostContainer;
