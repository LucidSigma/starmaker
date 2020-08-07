import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import StarForm from "../../../components/StarForm/StarForm";

const COLOURS = ["Red", "Red-orange", "Orange", "Orange-yellow", "Yellow", "Yellow-white", "White", "White-blue", "Blue"];

interface MatchParams {
	star_id: string,
}

export interface IEditStarProps extends RouteComponentProps<MatchParams> { }

export default (props: IEditStarProps) => {
	const [name, setName] = useState("");
	const [diameter, setDiameter] = useState(1.0);
	const [colour, setColour] = useState(COLOURS[0]);
	const [luminosity, setLuminosity] = useState(1.0);

	const starID = props.match.params.star_id;

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`/stars/${starID}`);
				const star = response.data;

				setName(star.name);
				setDiameter(star.diameter);
				setColour(star.colour);
				setLuminosity(star.luminosity);
			}
			catch (error) {

			}
		})();
	}, [starID]);

	const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.currentTarget.value);
	};

	const onChangeDiameter = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDiameter(+event.currentTarget.value || 0.0);
	};

	const onChangeColour = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setColour(event.currentTarget.value);
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
			try {
				await axios.put(`/stars/${starID}`, updatedStar);
			}
			catch (error) {

			}

			props.history.push(`/stars/${starID}`);
		})();
	};

	return (
		<div>
			<h3>Edit Star</h3>

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

			<Link to="/stars">Return</Link>
		</div>
	);
};