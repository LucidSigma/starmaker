import React from "react";
import { Link } from "react-router-dom";

import { Nav, Navbar } from "react-bootstrap";

export type NavbarProps = { };

export default (_props: NavbarProps) => {
	return (
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
	);
};