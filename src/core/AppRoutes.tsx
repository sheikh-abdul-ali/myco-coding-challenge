import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SmartRedirect } from "../atomicui/organisms/SmartRedirect";
import { PostFeed } from "../atomicui/pages/PostFeed";
import { SignIn } from "../atomicui/pages/SignIn";
import { SignUp } from "../atomicui/pages/SignUp";

const AppRoutes = () => (
	<BrowserRouter>
		<SmartRedirect>
			<Routes>
				<Route path="/" element={<PostFeed />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
			</Routes>
		</SmartRedirect>
	</BrowserRouter>
);

export default AppRoutes;
