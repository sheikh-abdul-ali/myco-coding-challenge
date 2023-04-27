import { useState } from "react";

import { useRecoilValue } from "recoil";

import add from "./assets/add.svg";
import avatar from "./assets/avatar.png";

import CreatePost from "./components/CreatePost/CreatePost";
import { postAtom } from "./store/postAtom";
import "./App.css";

function App() {
	const [open, setOpen] = useState(false);
	const posts = useRecoilValue(postAtom);

	const onOpen = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	const postContainer = () =>
		posts.map(({ id, title, content }) => (
			<div key={id} className="post-container">
				<h2>{title}</h2>
				<div className="post-content-wrapper">{content}</div>
			</div>
		));
	return (
		<div className="box">
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
	);
}

export default App;
