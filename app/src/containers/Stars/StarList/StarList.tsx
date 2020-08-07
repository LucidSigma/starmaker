import axios from "axios";
import React, { useEffect, useState } from "react";

export interface Star {
	name: String,
	diameter?: number,
	colour?: string,
	luminosity?: number,
	planets?: string[],
}

export type StarListProps = { };

export default (_props: StarListProps) => {
	const [stars, setStars] = useState<Star[]>([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get("/stars");
				setStars(response.data);
				setError(null);
			}
			catch (error) {
				setError(error);
			}
		})();
	}, []);

	const starList = stars.map((star) => {
		return <p>{ star.name }</p>
	});

	return (
		<div>
			<h2>List of Stars</h2>
			{ starList }
		</div>
	);
};