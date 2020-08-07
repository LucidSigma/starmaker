import React from "react";

const COLOURS = ["Red", "Red-orange", "Orange", "Orange-yellow", "Yellow", "Yellow-white", "White", "White-blue", "Blue"];

export type StarFormProps = {
	type: "New" | "Edit",

	name: string,
	diameter: number,
	colour: string,
	luminosity: number,

	onSubmitHandler: (event: React.FormEvent) => void,
	onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onChangeDiameter: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onChangeColour: (event: React.ChangeEvent<HTMLSelectElement>) => void,
	onChangeLuminosity: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export default (props: StarFormProps) => {
	return (
		<form onSubmit={ props.onSubmitHandler }>
			<div>
				<label>Name: </label>
				<input type="text" required value={ props.name } onChange={ props.onChangeName } />
			</div>
			
			<div>
				<label>Diameter (in Solar radii): </label>
				<input type="number" step="0.1" value={ props.diameter } onChange={ props.onChangeDiameter } />
			</div>

			<div>
				<label>Colour: </label>
				<select value={ props.colour } onChange={ props.onChangeColour }>
					{
						COLOURS.map((colour) => {
							return <option key={ colour } value={ colour}>{ colour }</option>
						})
					}
				</select>
			</div>

			<div>
				<label>Luminosity (in Solar luminosity): </label>
				<input type="number" step="0.1" value={ props.luminosity } onChange={ props.onChangeLuminosity } />
			</div>
			
			<div>
				<input type="submit" value={ props.type + " Star" } />
			</div>
		</form>
	);
};