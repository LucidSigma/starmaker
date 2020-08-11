import React from "react";
import { Alert } from "react-bootstrap";

export type ErrorBoxProps = {
	message: string,
};

export default (props: ErrorBoxProps) => {
	return (
		<Alert variant="danger">
			{ props.message }
		</Alert>
	);
};