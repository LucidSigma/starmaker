import axios from "axios";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import StarForm from "../../../components/StarForm/StarForm";

const COLOURS = ["Red", "Red-orange", "Orange", "Orange-yellow", "Yellow", "Yellow-white", "White", "White-blue", "Blue"];

export interface INewStarProps extends RouteComponentProps { }

export default (props: INewStarProps) => {
	const [name, setName] = useState("");
	const [diameter, setDiameter] = useState(1.0);
	const [colour, setColour] = useState(COLOURS[0]);
	const [luminosity, setLuminosity] = useState(1.0);

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

		const newStar = {
			name,
			diameter,
			colour,
			luminosity,
		};

		(async () => {
			try {
				await axios.post("/stars", newStar);
			}
			catch (error) {

			}

			props.history.push("/stars");
		})();
	};

	return (
		<div>
			<h3>Create a New Star</h3>

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
		</div>
	);
};