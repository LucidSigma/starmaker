import axios from "axios";
import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";

import StarForm from "../../../components/Forms/StarForm/StarForm";

import Colours, { Colour } from "../../../data/star_colours";

import styleClasses from "../../../components/Forms/Forms.module.scss";

export interface INewStarProps extends RouteComponentProps { }

export default (props: INewStarProps) => {
	const [name, setName] = useState("");
	const [diameter, setDiameter] = useState(1.0);
	const [colour, setColour] = useState(Colours[0]);
	const [luminosity, setLuminosity] = useState(1.0);

	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.currentTarget.value);
	};

	const onChangeDiameter = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDiameter(+event.currentTarget.value || 0.0);
	};

	const onChangeColour = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setColour(event.currentTarget.value as Colour);
	};

	const onChangeLuminosity = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLuminosity(+event.currentTarget.value || 0.0);
	};

	const onSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		const newStar = {
			name,
			diameter,
			colour,
			luminosity,
		};

		(async () => {
			setSubmitting(true);

			try {
				await axios.post("/stars", newStar);
				
				setError("");
				props.history.push("/stars");
			}
			catch (error) {
				setError(error.toString());
			}

			setSubmitting(false);
		})();
	};

	let display = (
		<StarForm
			type="New"
			name={ name }
			diameter={ diameter }
			colour={ colour }
			luminosity={ luminosity }
			onSubmitHandler={ onSubmitHandler }
			onChangeName={ onChangeName }
			onChangeColour={ onChangeColour }
			onChangeDiameter={ onChangeDiameter }
			onChangeLuminosity={ onChangeLuminosity }
		/>
	);

	if (submitting) {
		display = <p>Submitting new star...</p>
	}

	const errorMessage = error ? (
		<Alert variant="danger">
			{ error }
		</Alert>
	) : null;

	return (
		<div>
			<h3>Create a New Star</h3>

			{ errorMessage }
			{ display }

			<Link to="/stars">
				<Button className={ styleClasses.ReturnButton }>Return</Button>
			</Link>
		</div>
	);
};