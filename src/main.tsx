import React from "react";

import ReactDOM from "react-dom/client";

import { RecoilRoot } from "recoil";

import AppRoutes from "./core/AppRoutes.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RecoilRoot>
			<AppRoutes />
		</RecoilRoot>
	</React.StrictMode>
);
