import Cookies from "js-cookie";
import "./style.scss";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const handleLogin = (e) => {
		e.preventDefault();
		console.log("clicked");
		if (email && password) {
			const credentials = { email, password };
			localStorage.setItem("credentials", JSON.stringify(credentials));
			Cookies.set("credentials", JSON.stringify(credentials));
			dispatch({ type: "login" });
		}
	};

	return (
		<div className="login">
			<div className="gradientHolder"></div>
			<div className="loginContainer">
				<h1 className="loginHead">
					<span className="icon">
						<i className="fa-regular fa-user"></i>
					</span>
					Login Here<span className="dot">.</span>
				</h1>
				<div className="row">
					<div className="labelTitle">Email</div>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={(e) => {
							e.preventDefault();
							setEmail(e.target.value);
						}}
					/>
				</div>
				<div className="row">
					<div className="labelTitle">Password</div>
					<input
						type="password"
						value={password}
						onChange={(e) => {
							e.preventDefault();
							setPassword(e.target.value);
						}}
					/>
				</div>
				<div className="row">
					<button onClick={handleLogin}>Login</button>
				</div>

				<div className="row">
					<a href="#" className="register">
						New User?
					</a>
				</div>
			</div>
		</div>
	);
}
