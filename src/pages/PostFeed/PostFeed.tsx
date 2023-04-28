import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import add from "../../assets/add.svg";
import avatar from "../../assets/avatar.png";

import { Header } from "../../components/atoms/Header";
import { CommentSection } from "../../components/molecules/CommentSection";
import { CreatePost } from "../../components/molecules/CreatePost";
import { getUsers } from "../../data/usersData";
import { postAtom } from "../../store/postAtom";
import "./PostFeed.css";
import { userAtom } from "../../store/userAtom";
import { timeFromNow } from "../../utils/timeFromNow";

const PostFeed = () => {
	const [open, setOpen] = useState(false);
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

	const addCommentToPost = (id, comment) => {
		const updatedPosts = [...posts];
		const postIndex = posts.findIndex(post => post.id === id);
		const postComments = [...posts[postIndex].comments, comment];

		updatedPosts[postIndex] = { ...updatedPosts[postIndex], comments: postComments };
		setPosts(updatedPosts);
		return;
	};

	const postContainer = () =>
		posts.map(({ id, title, content, comments, userId, createdAt }) => {
			const user = getUsers().find(user => user.id === userId);
			return (
				<div key={id} className="post-container">
					<div className="post-content">
						<div className="post-metadata">
							<img src={avatar} className="post-picture" />
							<h4 style={{ alignSelf: "center" }}>{user.name}</h4>
							<p style={{ alignSelf: "center" }}>{timeFromNow(createdAt)}</p>
						</div>

						<h2>{title}</h2>
						<div className="post-content-wrapper">{content}</div>
					</div>
					<CommentSection comments={comments} addCommentToPost={addCommentToPost} postId={id} />
				</div>
			);
		});
	//TODO: Img to SVG

	return (
		<>
			<Header buttonName={user.id ? "Logout" : "Login"} onBtnClick={handleHeaderButton} />
			<div className="boxer">
				<div className="create-post-container" onClick={onOpen}>
					<div className="avatar-typography">
						<img src={avatar} className="avatar" />
						<p>Start a post</p>
					</div>
					<div className="icon">
						<img src={add} />
					</div>
				</div>
				<div className="main-wrapper">{postContainer()}</div>

				{!!open && <CreatePost onClose={onClose} />}
			</div>
		</>
	);
};

export default PostFeed;
