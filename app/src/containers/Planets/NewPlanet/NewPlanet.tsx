import axios from "axios";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import PlanetForm from "../../../components/PlanetForm/PlanetForm";

interface MatchParams {
	star_id: string,
}

export interface INewStarProps extends RouteComponentProps<MatchParams> { }

export default (props: INewStarProps) => {
	const [name, setName] = useState("");
	const [moonCount, setMoonCount] = useState(0);
	const [diameter, setDiameter] = useState(1.0);
	const [distanceFromStar, setDistanceFromStar] = useState(1.0);

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
				await axios.post("/stars/" + props.match.params.star_id + "/planets", newPlanet);
			}
			catch (error) {

			}

			props.history.push("/stars/" + props.match.params.star_id);
		})();
	};

	return (
		<div>
			<h3>Create a New Planet</h3>

			<PlanetForm
				type="New"
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
		</div>
	);
};