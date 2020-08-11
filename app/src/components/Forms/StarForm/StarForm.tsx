import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import Colours, { Colour } from "../../../data/star_colours";

import styleClasses from "../Forms.module.scss";

export type StarFormProps = {
	type: "New" | "Edit",

	name: string,
	diameter: number,
	colour: Colour,
	luminosity: number,

	onSubmitHandler: (event: React.FormEvent) => void,
	onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onChangeDiameter: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onChangeColour: (event: React.ChangeEvent<HTMLSelectElement>) => void,
	onChangeLuminosity: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export default (props: StarFormProps) => {
	return (
		<Form onSubmit={ props.onSubmitHandler }>
			<Row>
				<Col>
					<Form.Group>
						<Form.Label>Name: </Form.Label>
						<Form.Control type="text" required value={ props.name } onChange={ props.onChangeName } />
					</Form.Group>
				</Col>

				<Col>
					<Form.Group>
						<Form.Label>Diameter (in Solar diameters): </Form.Label>
						<Form.Control type="number" step="0.1" value={ props.diameter } onChange={ props.onChangeDiameter } />
					</Form.Group>
				</Col>
			</Row>

			<Row>
				<Col>
					<Form.Group>
						<Form.Label>Colour: </Form.Label>
						<Form.Control as="select" value={ props.colour } onChange={ props.onChangeColour }>
							{
								Colours.map((colour) => {
									return <option key={ colour } value={ colour}>{ colour }</option>
								})
							}
						</Form.Control>
					</Form.Group>
				</Col>

				<Col>
					<Form.Group>
						<Form.Label>Luminosity (in Solar luminosity): </Form.Label>
						<Form.Control type="number" step="0.1" value={ props.luminosity } onChange={ props.onChangeLuminosity } />
					</Form.Group>	
				</Col>
			</Row>
			
			<hr />

			<Form.Group>
				<Form.Control className={ styleClasses.Submit } type="submit" value={ (props.type === "New" ? "Create " : "") + props.type + " Star" } />
			</Form.Group>
		</Form>
	);
};