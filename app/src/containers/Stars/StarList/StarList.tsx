import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Star from "../../../data/star";

export type StarListProps = { };

export default (_props: StarListProps) => {
	const [stars, setStars] = useState<Star[]>([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			setLoading(true);

			try {
				const response = await axios.get("/stars");
				setStars(response.data);
				setError(null);
			}
			catch (error) {
				setError(error);
			}

			setLoading(false);
		})();
	}, []);

	const starList = stars.map((star) => {
		return <Link key={ star._id } to={ "/stars/" + star._id }>{ star.name }</Link>
	});

	return (
		<div>
			<h2>List of Stars</h2>
			{ loading ? <p>Loading...</p> : starList }
			<br />
			<Link to="/stars/new">Create a Star</Link>
			<br />
			<Link to="/">Return to Home</Link>
		</div>
	);
};