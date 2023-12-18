import { useState, useEffect } from "react";

import "./style.scss";

const WeatherCard = ({ mykey }) => {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${mykey}`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "cc86072221msh3e52d09dfc7103dp10b562jsn44bd12506501",
			"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
		},
	};
	const fetchData = async () => {
		try {
			const response = await fetch(url, options);
			const result = await response.json();
			if (!(JSON.stringify(result) === JSON.stringify(data))) {
				setData(result);
			}
		} catch (error) {
			// console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
		const intervalId = setInterval(fetchData, 60000);
		return () => clearInterval(intervalId);
	}, [data]);

	return data.error ? (
		<div className="errorBox"> {data.error.message} </div>
	) : (
		<div className="weather-card">
			<div className="gradientStyle"></div>

			{isLoading ? (
				<div>Loading ...................</div>
			) : (
				<div>
					<h2>
						{data.location.name}, {data.location.country}
					</h2>
					<p>{data.location.localtime}</p>
					<img
						src={`https:${data.current.condition.icon}`}
						alt={data.current.condition.text}
					/>
					<p>{data.current.condition.text}</p>
					<p>
						Temperature: {data.current.temp_c}°C / {data.current.temp_f}°F
					</p>
					<p>
						Wind: {data.current.wind_kph} km/h, {data.current.wind_dir}
					</p>
					<p>Pressure: {data.current.pressure_mb} mb</p>
					<p>Humidity: {data.current.humidity}%</p>
				</div>
			)}
		</div>
	);
};

export default WeatherCard;
