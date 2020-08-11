import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";

import ErrorBox from "../../../components/ErrorBox/ErrorBox";
import PlanetForm from "../../../components/Forms/PlanetForm/PlanetForm";

import styleClasses from "../../../components/Forms/Forms.module.scss";

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
	const [error, setError] = useState("");

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
				
				setError("");
				props.history.push("/stars/" + props.match.params.star_id);
			}
			catch (error) {
				setError(error.toString());
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

	const errorMessage = error ? <ErrorBox message={ error } /> : null;

	return (
		<div>
			<h3>Create a New Planet</h3>

			{ errorMessage }
			{ display }

			<Link to={ "/stars/" + props.match.params.star_id }>
				<Button className={ styleClasses.ReturnButton }>Return</Button>
			</Link>
		</div>
	);
};