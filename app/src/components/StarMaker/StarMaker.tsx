import React from "react";
import { Route, Switch } from "react-router-dom";

import StarData from "../../containers/Stars/StarData/StarData";
import StarList from "../../containers/Stars/StarList/StarList";

export type StarMakerProps = { };

export default (_props: StarMakerProps) => {
	return (
		<div>
			<h1>StarMaker</h1>

			<Switch>
				<Route path="/" exact render={ () => <h1>Home.</h1> } />
				<Route path="/stars" exact component={ StarList } />
				<Route path="/stars/:star_id" component={ StarData } />
				<Route render={ () => <h1>404 Page.</h1> } /> 
			</Switch>
		</div>
	);
};