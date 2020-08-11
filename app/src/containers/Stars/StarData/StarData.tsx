import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap"; 
import { Link, RouteComponentProps } from "react-router-dom";

import ErrorBox from "../../../components/ErrorBox/ErrorBox";

import styleClasses from "./StarData.module.scss";

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
	const [error, setError] = useState("");

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
				setPlanetIDs(star.planet_ids);
				setPlanetNames(star.planet_names);

				setError("");
			}
			catch (error) {
				setError(error.toString());
			}
			
			setLoading(false);
		})();
	}, [starID]);

	const deleteHandler = () => {
		(async () => {
			setLoading(true);

			try {
				await axios.delete(`/stars/${starID}`);

				setError("");
				props.history.push("/stars");
			}
			catch (error) {
				setError(error.toString());
			}

			setLoading(false);
		})();
	};

	const planetList = planetIDs.map((planetID, i) => {
		return (
			<li key= { planetID }>
				<Link className={ styleClasses.PlanetLink } to={ starID + "/planets/" + planetID }>{ planetNames[i] }</Link>
			</li>
		);
	});

	let display = (
		<div>
			<h2>{ name }</h2>
			
			<div className={ styleClasses.DataList }>
				<ListGroup>
					<ListGroup.Item><strong>Diameter (Solar radii): </strong>{ diameter }</ListGroup.Item>
					<ListGroup.Item><strong>Colour: </strong>{ colour }</ListGroup.Item>
					<ListGroup.Item><strong>Luminosity (Solar luminosity): </strong>{ luminosity }</ListGroup.Item>

					<ListGroup.Item>
						<h4>Planets</h4>
						{ planetNames.length > 0 ? <ul className={ styleClasses.PlanetList }>{ planetList }</ul> : <p>None</p> }
					</ListGroup.Item>
				</ListGroup>
			</div>

			<Link to={ starID + "/planets/new" }>
				<Button className={ styleClasses.ActionButton }>Create Planet</Button>
			</Link>

			<Link to={ starID + "/edit" }>
				<Button className={ styleClasses.ActionButton }>Edit</Button>
			</Link>
			
			<Button className={ styleClasses.ActionButton } onClick={ deleteHandler }>Delete</Button>
		</div>
	);

	if (loading) {
		display = <p>Loading star data...</p>;
	}

	if (error) {
		display = <ErrorBox message={ error } />;
	}
	
	return (
		<div>
			{ display }
			
			<Link to="/stars">
				<Button className={ styleClasses.ActionButton }>Return</Button>
			</Link>
		</div>
	);
};