import axios from "axios";
import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import PlanetForm from "../../../components/Forms/PlanetForm/PlanetForm";

interface MatchParams {
	star_id: string,
}

export interface INewPlanetProps extends RouteComponentProps<MatchParams> { }

export default (props: INewPlanetProps) => {
	const [name, setName] = useState("");
	const [moonCount, setMoonCount] = useState(0);
	const [diameter, setDiameter] = useState(1.0);
	const [distanceFromStar, setDistanceFromStar] = useState(1.0);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

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
		setLoading(true);

		const newPlanet = {
			name,
			moonCount,
			diameter,
			distanceFromStar,
		};

		(async () => {
			try {
				await axios.post("/stars/" + props.match.params.star_id + "/planets", newPlanet);
				
				setError(null);
				props.history.push("/stars/" + props.match.params.star_id);
			}
			catch (error) {
				setError(error);
			}

			setLoading(false);
		})();
	};

	let display = (<PlanetForm
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
	/>);

	if (loading) {
		display = <p>Submitting new planet...</p>
	}

	const errorMessage = error ? (
		<div>
			<p>An error occured. Please try again.</p>
			<p>Error: { error }</p>
		</div>
	) : null;

	return (
		<div>
			<h3>Create a New Planet</h3>

			{ errorMessage }
			{ display }

			<Link to={ "/stars/" + props.match.params.star_id }>Return</Link>
		</div>
	);
};