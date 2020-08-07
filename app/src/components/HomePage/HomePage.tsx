import React from "react";
import { Link } from "react-router-dom";

export type HomePageProps = { };

export default (_props: HomePageProps) => {
	return (
		<div>
			<Link to="/stars">Go to Stars</Link>
		</div>
	);
};