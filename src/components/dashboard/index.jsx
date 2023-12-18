import { useDispatch } from "react-redux";
import "./style.scss";
import WeatherCard from "../weatherCard";
import { useEffect, useState } from "react";
import { authActions } from "../../reducers/authReducer";

export default function Dashboard(props) {
	const dispatch = useDispatch();

	const [showResult, setShowResult] = useState(false);
	const [query, setQuery] = useState("");

	const inputHandler = (e) => {
		e.preventDefault();
		setQuery(e.target.value);
	};

	useEffect(() => {
		setShowResult(false);
		const delayDebounceFn = setTimeout(() => {
			if (query.length > 1) {
				setShowResult(true);
			} else {
				setShowResult(false);
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [query]);

	const handleLogout = () => {
		dispatch(authActions.logout());
		props.clearDataHandler();
	};

	const cities = [
		"Tokyo",
		"Delhi",
		"Shanghai",
		"São Paulo",
		"Mumbai",
		"Mexico City",
		"Beijing",
		"Osaka",
		"Cairo",
		"New York City",
	];

	return (
		<div className="dashBoard">
			<div className="navbar">
				<button onClick={handleLogout}>Logout</button>
			</div>
			<div className="content">
				<div className="searchBar">
					<div className="wrapper">
						<input
							className="searchField"
							placeholder="Search ........................................................................................"
							type="text"
							value={query}
							onChange={inputHandler}
						/>
					</div>
				</div>
				<div className="results">
					{showResult ? (
						<WeatherCard mykey={query} />
					) : (
						<div className="results_static">
							{cities.map((item) => {
								return <WeatherCard mykey={item} key={item} />;
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
