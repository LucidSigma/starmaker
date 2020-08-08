import React from "react";

export type PlanetFormProps = {
	type: "New" | "Edit",

	name: string,
	moonCount: number,
	diameter: number,
	distanceFromStar: number,

	onSubmitHandler: (event: React.FormEvent) => void,
	onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onChangeMoonCount: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onChangeDiameter: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onChangeDistanceFromStar: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export default (props: PlanetFormProps) => {
	return (
		<form onSubmit={ props.onSubmitHandler }>
			<div>
				<label>Name: </label>
				<input type="text" required value={ props.name } onChange={ props.onChangeName } />
			</div>

			<div>
				<label>Number of moons: </label>
				<input type="number" step="1" value={ props.moonCount } onChange={ props.onChangeMoonCount } />
			</div>
			
			<div>
				<label>Diameter (in Earth radii): </label>
				<input type="number" step="0.1" value={ props.diameter } onChange={ props.onChangeDiameter } />
			</div>

			<div>
				<label>Distance from star (in AU): </label>
				<input type="number" step="0.1" value={ props.distanceFromStar } onChange={ props.onChangeDistanceFromStar } />
			</div>
			
			<div>
				<input type="submit" value={ props.type + " Star" } />
			</div>
		</form>
	);
};