import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom";

import ErrorBox from "../../../components/ErrorBox/ErrorBox";
import Star from "../../../data/star";

import styleClasses from "./StarList.module.scss";

export type StarListProps = { };

export default (_props: StarListProps) => {
	const [stars, setStars] = useState<Star[]>([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		(async () => {
			setLoading(true);

			try {
				const response = await axios.get("/stars");

				setStars(response.data);
				setError("");
			}
			catch (error) {
				setError(error.toString());
			}

			setLoading(false);
		})();
	}, []);

	const starList = stars.map((star) => {
		return (
			<ListGroup.Item key={ star._id }>
				<Link className={ styleClasses.Link } to={ "/stars/" + star._id }>
					{ star.name }
				</Link>
			</ListGroup.Item>
		);
	});

	const starListWithHeader = (
		<ListGroup className={ styleClasses.List }>
			<ListGroup.Item className={ styleClasses.ListHeader }><h2>List of Stars</h2></ListGroup.Item>
			{ starList }
		</ListGroup>
	);

	let display = (
		<div>
			{ starList.length > 0 ? starListWithHeader : <p>No stars to show.</p> }
		</div>
	);

	if (loading) {
		display = <p>Loading stars...</p>;
	}

	if (error) {
		display = <ErrorBox message={ error } />;
	}

	return (
		<div>
			{ display }
			
			<Link className={ styleClasses.ButtonLink } to="/stars/new">
				<Button className={ styleClasses.Button }>Create a Star</Button>
			</Link>

			<Link className={ styleClasses.ButtonLink } to="/">
				<Button className={ styleClasses.Button }>Return to Home</Button>
			</Link>
		</div>
	);
};