import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

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
					<input type="submit" value="Edit Star" />
				</div>
			</form>
			
			<Link to="/stars">Return</Link>
		</div>
	);
};