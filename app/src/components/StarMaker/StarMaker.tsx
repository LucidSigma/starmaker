import React from "react";
import { Route, Switch } from "react-router-dom";

export type StarMakerProps = { };

export default (_props: StarMakerProps) => {
	return (
		<div>
			<h1>StarMaker Home Page</h1>

			<Switch>
				<Route path="/" exact render={ () => <h1>Home.</h1> } />
				<Route path="/stars" render={ () => <h1>Stars.</h1> } />
				<Route render={ () => <h1>404 Page.</h1> } /> 
			</Switch>
		</div>
	);
};