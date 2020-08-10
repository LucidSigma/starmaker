import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import styleClasses from "./PlanetForm.module.scss";

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
						<Form.Label>Number of moons: </Form.Label>
						<Form.Control type="number" step="1" value={ props.moonCount } onChange={ props.onChangeMoonCount } />
					</Form.Group>
				</Col>
			</Row>
			
			<Row>
				<Col>
					<Form.Group>
						<Form.Label>Diameter (in Earth radii): </Form.Label>
						<Form.Control type="number" step="0.1" value={ props.diameter } onChange={ props.onChangeDiameter } />
					</Form.Group>
				</Col>

				<Col>
					<Form.Group>
						<Form.Label>Distance from star (in AU): </Form.Label>
						<Form.Control type="number" step="0.1" value={ props.distanceFromStar } onChange={ props.onChangeDistanceFromStar } />
					</Form.Group>
				</Col>
			</Row>
			
			<Form.Group>
				<Form.Control className={ styleClasses.Submit } type="submit" value={ (props.type === "New" ? "Create " : "") + props.type + " Planet" } />
			</Form.Group>
		</Form>
	);
};