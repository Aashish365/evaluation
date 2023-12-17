import "./style.scss";
import Login from "../login";
import Dashboard from "../dashboard";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		const storedCredentials = localStorage.getItem("credentials");
		if (storedCredentials) {
			dispatch({ type: "login" });
		} else {
			dispatch({ type: "logout" });
		}
	}, []);

	const clearDataHandler = () => {
		localStorage.clear("credentials");
		Cookies.remove("credentials");
		dispatch({ type: "logout" });
	};

	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	return isLoggedIn ? (
		<Dashboard clearDataHandler={clearDataHandler} />
	) : (
		<Login />
	);
}
