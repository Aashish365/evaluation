import "./style.scss";
import Login from "../login";
import Dashboard from "../dashboard";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../reducers/authReducer";

export default function Home() {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		const storedCredentials = localStorage.getItem("credentials");
		if (storedCredentials) {
			dispatch(authActions.login());
		} else {
			dispatch(authActions.logout());
		}
	}, []);

	const clearDataHandler = () => {
		localStorage.clear("credentials");
		Cookies.remove("credentials");
	};
	return isLoggedIn ? (
		<Dashboard clearDataHandler={clearDataHandler} />
	) : (
		<Login />
	);
}
