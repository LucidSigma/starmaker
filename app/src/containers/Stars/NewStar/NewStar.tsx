import axios from "axios";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

const COLOURS = ["Red", "Red-orange", "Orange", "Orange-yellow", "Yellow", "Yellow-white", "White", "White-blue", "Blue"];

export interface INewStarProps extends RouteComponentProps { }

export default (props: INewStarProps) => {
	const [name, setName] = useState("");
	const [diameter, setDiameter] = useState(0.0);
	const [colour, setColour] = useState(COLOURS[0]);
	const [luminosity, setLuminosity] = useState(0.0);

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

			<form onSubmit={ onSubmitHandler }>
				<div>
					<label>Name: </label>
					<input type="text" required value={ name } onChange={ onChangeName } />
				</div>
				
				<div>
					<label>Diameter (in Solar radii): </label>
					<input type="number" step="0.1" value={ diameter } onChange={ onChangeDiameter } />
				</div>

				<div>
					<label>Colour: </label>
					<select value={ colour } onChange={ onChangeColour }>
						{
							COLOURS.map((colour) => {
								return <option key={ colour } value={ colour}>{ colour }</option>
							})
						}
					</select>
				</div>

				<div>
					<label>Luminosity (in Solar luminosity): </label>
					<input type="number" step="0.1" value={ luminosity } onChange={ onChangeLuminosity } />
				</div>
				
				<div>
					<input type="submit" value="Create Star" />
				</div>
			</form>
		</div>
	);
};