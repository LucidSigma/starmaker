import React from "react";
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";

import styleClasses from "./HomePage.module.scss";

export type HomePageProps = { };

export default (_props: HomePageProps) => {
	return (
		<div>
			<h1 className={ styleClasses.Header }>Welcome to StarMaker!</h1>
			<p className={ styleClasses.Subtitle }>Where you can create all sorts of stars and planets!</p>

			<Link className={ styleClasses.Link } to="/stars">
				<Button className={ styleClasses.Button }>Go to Stars</Button>
			</Link>
		</div>
	);
};