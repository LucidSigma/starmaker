import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

interface MatchParams {
	star_id: string,
}

export interface IStarDataProps extends RouteComponentProps<MatchParams> { }

export default (props: IStarDataProps) => {
	const [name, setName] = useState("");
	const [diameter, setDiameter] = useState(0.0);
	const [colour, setColour] = useState("");
	const [luminosity, setLuminosity] = useState(0.0);
	const [planets, setPlanets] = useState<string[]>([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const starID = props.match.params.star_id;

	useEffect(() => {
		(async () => {
			setLoading(true);

			try {
				const response = await axios.get(`/stars/${starID}`);
				const star = response.data;

				setName(star.name);
				setDiameter(star.diameter);
				setColour(star.colour);
				setLuminosity(star.luminosity);
				setPlanets(star.planets);

				setError(null);
			}
			catch (error) {
				setError(error);
			}
			
			setLoading(false);
		})();
	}, [starID]);

	const deleteHandler = () => {
		(async () => {
			try {
				await axios.delete(`/stars/${starID}`);

				props.history.push("/stars");
			}
			catch (error) {

			}
		})();
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<p>{ name }</p>
			<p>{ diameter }</p>
			<p>{ colour }</p>
			<p>{ luminosity }</p>
			<p>{ planets.join(", ") }</p>

			<Link to={ starID + "/edit" }>Edit</Link>
			<button onClick={ deleteHandler }>Delete</button>
			<br />
			<Link to="/stars">Return</Link>
		</div>
	);
};