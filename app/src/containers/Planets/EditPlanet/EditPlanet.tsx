import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import PlanetForm from "../../../components/PlanetForm/PlanetForm";

interface MatchParams {
	star_id: string,
	planet_id: string,
}

export interface IEditPlanetProps extends RouteComponentProps<MatchParams> { }

export default (props: IEditPlanetProps) => {
	const [name, setName] = useState("");
	const [moonCount, setMoonCount] = useState(0);
	const [diameter, setDiameter] = useState(1.0);
	const [distanceFromStar, setDistanceFromStar] = useState(1.0);

	const starID = props.match.params.star_id;
	const planetID = props.match.params.planet_id;

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`/stars/${starID}/planets/${planetID}`);
				const planet = response.data;

				setName(planet.name);
				setMoonCount(planet.moonCount);
				setDiameter(planet.diameter);
				setDistanceFromStar(planet.distanceFromStar);
			}
			catch (error) {

			}
		})();
	}, [planetID, starID]);

	const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.currentTarget.value);
	};

	const onChangeMoonCount = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMoonCount(+event.currentTarget.value || 0);
	};

	const onChangeDiameter = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDiameter(+event.currentTarget.value || 0.0);
	};

	const onChangeDistanceFromStar = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDistanceFromStar(+event.currentTarget.value || 0.0);
	};

	const onSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		const newPlanet = {
			name,
			moonCount,
			diameter,
			distanceFromStar,
		};

		(async () => {
			try {
				await axios.put("/stars/" + starID + "/planets/" + planetID, newPlanet);
			}
			catch (error) {

			}

			props.history.push("/stars/" + starID + "/planets/" + planetID);
		})();
	};

	return (
		<div>
			<h3>Edit Planet</h3>

			<PlanetForm
				type="Edit"
				name={ name }
				moonCount={ moonCount}
				diameter={ diameter }
				distanceFromStar={ distanceFromStar }
				onSubmitHandler={ onSubmitHandler }
				onChangeName={ onChangeName }
				onChangeMoonCount={ onChangeMoonCount }
				onChangeDiameter={ onChangeDiameter }
				onChangeDistanceFromStar={ onChangeDistanceFromStar }
			/>

			<Link to={ "/stars/" + starID + "/planets" + planetID }>Return</Link>
		</div>
	);
};