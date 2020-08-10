import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import EditPlanet from "../../containers/Planets/EditPlanet/EditPlanet";
import EditStar from "../../containers/Stars/EditStar/EditStar";
import HomePage from "../HomePage/HomePage";
import NewPlanet from "../../containers/Planets/NewPlanet/NewPlanet";
import NewStar from "../../containers/Stars/NewStar/NewStar";
import PlanetData from "../../containers/Planets/PlanetData/PlanetData";
import StarData from "../../containers/Stars/StarData/StarData";
import StarList from "../../containers/Stars/StarList/StarList";

import { Nav, Navbar } from "react-bootstrap";

export type StarMakerProps = { };

export default (_props: StarMakerProps) => {
	return (
		<div>
			<Navbar bg="dark" expand="lg">
				<Navbar.Brand><Link to="/">StarMaker</Link></Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className = "mr-auto">
						<Nav.Link><Link to="/">Home</Link></Nav.Link>
						<Nav.Link><Link to="/new">Stars</Link></Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<Switch>
				<Route path="/" exact component={ HomePage } />
				<Route path="/stars" exact component={ StarList } />
				<Route path="/stars/new" exact component={ NewStar } />
				<Route path="/stars/:star_id/planets/new" exact component={ NewPlanet } />
				<Route path="/stars/:star_id/planets/:planet_id/edit"  component={ EditPlanet } />
				<Route path="/stars/:star_id/planets/:planet_id" component={ PlanetData } />
				<Route path="/stars/:star_id/edit" component={ EditStar } />
				<Route path="/stars/:star_id" component={ StarData } />
				<Route render={ () => <h1>404 Page.</h1> } /> 
			</Switch>
		</div>
	);
};