import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import add from "../../assets/add.svg";
import avatar from "../../assets/avatar.png";

import CommentSection from "../../components/CommentSection/CommentSection";
import CreatePost from "../../components/CreatePost/CreatePost";
import { getUsers } from "../../data/usersData";
import { postAtom } from "../../store/postAtom";
import "./PostFeed.css";

const PostFeed = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const setPosts = useSetRecoilState(postAtom);
	const posts = useRecoilValue(postAtom);

	const addCommentToPost = (id, comment) => {
		const updatedPosts = [...posts];
		const postIndex = posts.findIndex(post => post.id === id);
		const postComments = [...posts[postIndex].comments, comment];

		updatedPosts[postIndex] = { ...updatedPosts[postIndex], comments: postComments };
		// console.log({ postIndex, postComments, updatedPosts });
		setPosts(updatedPosts);
	};

	const onOpen = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	const postContainer = () =>
		posts.map(({ id, title, content, comments, userId }) => {
			const user = getUsers().find(user => user.id === userId);
			return (
				<div key={id} className="post-container">
					<div className="post-content">
						<div className="post-metadata">
							<img src={avatar} className="post-picture" />
							<h4 style={{ alignSelf: "center" }}>{user.name}</h4>
							<p style={{ alignSelf: "center" }}>a year ago</p>
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
			<header className="post-header">
				<div className="mx-auto w-full px-10vw">
					<div className="flex items-center justify-end h-full">
						<button className="text-white hover:text-gray-300" onClick={() => navigate("/signup")}>
							Logout
						</button>
					</div>
				</div>
			</header>
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
