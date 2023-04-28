import { FC } from "react";

import styles from "./Comment.module.css";

import avatar from "../../../assets/avatar.png";
import { timeFromNow } from "../../../utils/timeFromNow";

interface ICommentProps {
	content: string;
	name: string;
	createdAt: string;
}

const Comment: FC<ICommentProps> = ({ content, name, createdAt }) => {
	return (
		<div className={styles["comment"]}>
			<img src={avatar} className={styles["comment-picture"]} />
			<div className={styles["comment-body"]}>
				<div className={styles["comment-metadata"]}>
					<div className={styles["comment-name"]}>{name}</div>
					<div className={styles["comment-time"]}>{timeFromNow(createdAt)}</div>
				</div>
				<div className={styles["comment-content"]}>{content}</div>
			</div>
		</div>
	);
};

export default Comment;
