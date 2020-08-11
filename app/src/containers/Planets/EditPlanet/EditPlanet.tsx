import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";

import ErrorBox from "../../../components/ErrorBox/ErrorBox";
import PlanetForm from "../../../components/Forms/PlanetForm/PlanetForm";

import styleClasses from "../../../components/Forms/Forms.module.scss";

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

	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	const starID = props.match.params.star_id;
	const planetID = props.match.params.planet_id;

	useEffect(() => {
		setLoading(true);

		(async () => {
			try {
				const response = await axios.get(`/stars/${starID}/planets/${planetID}`);
				const planet = response.data;

				setName(planet.name);
				setMoonCount(planet.moonCount);
				setDiameter(planet.diameter);
				setDistanceFromStar(planet.distanceFromStar);

				setError("");
			}
			catch (error) {
				setError(error.toString());
			}
		})();

		setLoading(false);
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
			setSubmitting(true);

			try {
				await axios.put("/stars/" + starID + "/planets/" + planetID, newPlanet);
				setError("");
			}
			catch (error) {
				setError(error.toString());
			}

			setSubmitting(false);
			props.history.push("/stars/" + starID + "/planets/" + planetID);
		})();
	};

	let display = (
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
	);

	if (loading) {
		display = <p>Loading planet data...</p>
	}

	if (submitting) {
		display = <p>Submitting updated planet data...</p>
	}

	const errorMessage = error ? <ErrorBox message={ error } /> : null;

	return (
		<div>
			<h3>Edit Planet</h3>

			{ errorMessage }
			{ display }

			<Link to={ "/stars/" + starID + "/planets/" + planetID }>
				<Button className={ styleClasses.ReturnButton }>Return</Button>
			</Link>
		</div>
	);
};