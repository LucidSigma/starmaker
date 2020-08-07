import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import StarMaker from "./components/StarMaker/StarMaker";

import "./App.css";

export type AppProps = { };

export default (_props: AppProps) => {
	return (
		<Router>
			<div className="App">
				<StarMaker />
			</div>
		</Router>	
	);
};
