import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";

import styleClasses from "./PlanetData.module.scss";

interface MatchParams {
	star_id: string,
	planet_id: string,
}

export interface IPlanetDataProps extends RouteComponentProps<MatchParams> { }

export default (props: IPlanetDataProps) => {
	const [name, setName] = useState("");
	const [moonCount, setMoonCount] = useState(0);
	const [diameter, setDiameter] = useState(0.0);
	const [distanceFromStar, setDistanceFromStar] = useState(0.0);
	const [starName, setStarName] = useState("");

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const starID = props.match.params.star_id;
	const planetID = props.match.params.planet_id;

	useEffect(() => {
		(async () => {
			setLoading(true);

			try {
				const response = await axios.get(`/stars/${starID}/planets/${planetID}`);
				const planet = response.data;

				setName(planet.name);
				setMoonCount(planet.moonCount);
				setDiameter(planet.diameter);
				setDistanceFromStar(planet.distanceFromStar);
				setStarName(planet.starName);

				setError("");
			}
			catch (error) {
				setError(error.toString());
			}
			
			setLoading(false);
		})();
	}, [planetID, starID]);

	const deleteHandler = () => {
		(async () => {
			setLoading(true);

			try {
				await axios.delete(`/stars/${starID}/planets/${planetID}`);
				
				setError("");
				props.history.push(`/stars/${starID}`);
			}
			catch (error) {
				setError(error.toString());
			}

			setLoading(false);
		})();
	};

	let display = (
		<div>
			<ListGroup>
				<ListGroup.Item>
					<h2>{ name }</h2>
					<h5>Orbits <Link className={ styleClasses.StarLink } to={ "/stars/" + starID }>{ starName }</Link></h5>
				</ListGroup.Item>

				<ListGroup.Item><strong>Number of moons: </strong>{ moonCount }</ListGroup.Item>
				<ListGroup.Item><strong>Diameter (in Earth radii): </strong>{ diameter }</ListGroup.Item>
				<ListGroup.Item><strong>Distance from star (in AU): </strong>{ distanceFromStar }</ListGroup.Item>
			</ListGroup>
		</div>
	);

	if (loading) {
		display = <p>Loading planet data...</p>;
	}

	if (error) {
		display = (
			<Alert variant="danger">
				{ error }
			</Alert>
		);
	}

	return (
		<div>
			{ display }

			<div>
				<Link to={ planetID + "/edit" }>
					<Button className={ styleClasses.ActionButton }>Edit</Button>
				</Link>

				<Button className={ styleClasses.ActionButton } onClick={ deleteHandler }>Delete</Button>
			</div>

			<Link to={ "/stars/" + starID }>
				<Button className={ styleClasses.ActionButton }>Return</Button>
			</Link>
		</div>
	);
};