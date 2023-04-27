import { BrowserRouter, Route, Routes } from "react-router-dom";

import PostFeed from "../pages/PostFeed/PostFeed";
import SignUp from "../pages/SignUp/SignUp";

const AppRoutes = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<PostFeed />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/signin" element={<SignUp />} />
		</Routes>
	</BrowserRouter>
);

export default AppRoutes;
