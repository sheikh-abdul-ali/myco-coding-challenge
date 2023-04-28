import { FC, ReactNode, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userAtom } from "../../../store/userAtom";

const SmartRedirect: FC<{ children: ReactNode }> = ({ children }) => {
	const user = useRecoilValue(userAtom);
	const navigate = useNavigate();

	useEffect(() => {
		if ((location.pathname === "/signin" || location.pathname === "/signup") && user.id) {
			return navigate("/");
		}
	}, [navigate, user.id]);
	return <>{children}</>;
};

export default SmartRedirect;
