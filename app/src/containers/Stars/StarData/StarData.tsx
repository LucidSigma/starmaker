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
	const [planetIDs, setPlanetIDs] = useState<string[]>([]);
	const [planetNames, setPlanetNames] = useState<string[]>([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const starID = props.match.params.star_id;

	useEffect(() => {
		(async () => {
			setLoading(true);

			try {
				const starResponse = await axios.get(`/stars/${starID}`);
				const star = starResponse.data;

				setName(star.name);
				setDiameter(star.diameter);
				setColour(star.colour);
				setLuminosity(star.luminosity);
				setPlanetIDs(star.planet_ids);
				setPlanetNames(star.planet_names);

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
				console.error(error);
			}
		})();
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	const planetList = planetIDs.map((planetID, i) => {
		return <li><Link to={ "planets/" + planetID }>{ planetNames[i] }</Link></li>;
	});

	return (
		<div>
			<h2>{ name }</h2>
			<p><strong>Diameter (Solar radii): </strong>{ diameter }</p>
			<p><strong>Colour: </strong>{ colour }</p>
			<p><strong>Luminosity (Solar luminosity): </strong>{ luminosity }</p>

			<h3>Planets</h3>
			{ planetNames.length > 0 ? <ul>{ planetList }</ul> : <p>None</p> }

			<Link to={ starID + "/edit" }>Edit</Link>
			<button onClick={ deleteHandler }>Delete</button>
			<br />
			<Link to="/stars">Return</Link>
		</div>
	);
};