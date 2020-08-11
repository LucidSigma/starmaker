import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";

import ErrorBox from "../../../components/ErrorBox/ErrorBox";
import StarForm from "../../../components/Forms/StarForm/StarForm";

import Colours, { Colour } from "../../../data/star_colours";

import styleClasses from "../../../components/Forms/Forms.module.scss";

interface MatchParams {
	star_id: string,
}

export interface IEditStarProps extends RouteComponentProps<MatchParams> { }

export default (props: IEditStarProps) => {
	const [name, setName] = useState("");
	const [diameter, setDiameter] = useState(1.0);
	const [colour, setColour] = useState(Colours[0]);
	const [luminosity, setLuminosity] = useState(1.0);

	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	const starID = props.match.params.star_id;

	useEffect(() => {
		setLoading(true);

		(async () => {
			try {
				const response = await axios.get(`/stars/${starID}`);
				const star = response.data;

				setName(star.name);
				setDiameter(star.diameter);
				setColour(star.colour);
				setLuminosity(star.luminosity);

				setError("");
			}
			catch (error) {
				setError(error.toString());
			}
		})();

		setLoading(false);
	}, [starID]);

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

		const updatedStar = {
			name,
			diameter,
			colour,
			luminosity,
		};

		(async () => {
			setSubmitting(true);

			try {
				await axios.put(`/stars/${starID}`, updatedStar);
				setError("");
			}
			catch (error) {
				setError(error.toString());
			}

			setSubmitting(false);
			props.history.push(`/stars/${starID}`);
		})();
	};

	let display = (
		<StarForm
			type="Edit"
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

	if (loading) {
		display = <p>Loading star data...</p>
	}

	if (submitting) {
		display = <p>Submitting updated star data...</p>
	}

	const errorMessage = error ? <ErrorBox message={ error } /> : null;

	return (
		<div>
			<h3>Edit Star</h3>

			{ errorMessage }
			{ display }

			<Link to={ "/stars/" + starID }>
				<Button className={ styleClasses.ReturnButton }>Return</Button>
			</Link>
		</div>
	);
};