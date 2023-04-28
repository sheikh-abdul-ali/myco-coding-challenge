import { BrowserRouter, Route, Routes } from "react-router-dom";

import PostFeed from "../pages/PostFeed/PostFeed";
import { SignIn } from "../pages/SignIn";
import SignUp from "../pages/SignUp/SignUp";

const AppRoutes = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<PostFeed />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/signin" element={<SignIn />} />
		</Routes>
	</BrowserRouter>
);

export default AppRoutes;
