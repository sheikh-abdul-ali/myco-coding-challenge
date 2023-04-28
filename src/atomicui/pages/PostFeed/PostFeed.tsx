import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import avatar from "assets/avatar.png";

import styles from "./PostFeed.module.css";

import { Add } from "../../../assets";
import { getUsers } from "../../../data/usersData";
import { Comment } from "../../../models/comment";
import { User } from "../../../models/user";
import { postAtom } from "../../../store/postAtom";
import { userAtom } from "../../../store/userAtom";

import { Header } from "../../atoms/Header";
import { CreatePost } from "../../molecules/CreatePost";
import { PostContainer } from "../../organisms/PostContainer";

const PostFeed: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	const setPosts = useSetRecoilState(postAtom);
	const posts = useRecoilValue(postAtom);
	const user = useRecoilValue(userAtom);
	const resetUser = useResetRecoilState(userAtom);

	const handleHeaderButton = () => {
		if (user.id) {
			resetUser();
		}
		navigate("/signin");
	};

	const onOpen = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	const addCommentToPost = (id: string, comment: Comment) => {
		const updatedPosts = [...posts];
		const postIndex = posts.findIndex(post => post.id === id);
		const postComments = [...posts[postIndex].comments, comment];

		updatedPosts[postIndex] = { ...updatedPosts[postIndex], comments: postComments };
		setPosts(updatedPosts);
		return;
	};

	const postContainer = () =>
		posts.map(({ id, title, content, comments, userId, createdAt }) => {
			const user = getUsers().find((user: User) => user.id === userId);
			return (
				<PostContainer
					key={id}
					postId={id}
					title={title}
					content={content}
					name={user.name}
					createdAt={createdAt}
					comments={comments}
					addCommentToPost={addCommentToPost}
				/>
			);
		});

	return (
		<>
			<Header buttonName={user.id ? "Logout" : "Login"} onBtnClick={handleHeaderButton} />
			<div className={styles["main"]}>
				{!!user.id && (
					<div className={styles["create-post-container"]} onClick={onOpen}>
						<div className={styles["avatar-typography"]}>
							<img src={avatar} className={styles["avatar"]} />
							<p>Start a post</p>
						</div>
						<div className={styles["icon"]}>
							<Add />
						</div>
					</div>
				)}
				<div className={styles["main-wrapper"]}>{postContainer()}</div>

				{!!open && <CreatePost onClose={onClose} />}
			</div>
		</>
	);
};

export default PostFeed;
