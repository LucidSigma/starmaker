import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import styleClasses from "./Navbar.module.scss";

export type NavbarProps = { };

export default (_props: NavbarProps) => {
	return (
		<Navbar expand="sm" className={ styleClasses.Navbar }>
			<Navbar.Brand><Link className={ styleClasses.Brand } to="/">StarMaker</Link></Navbar.Brand>
			<Navbar.Toggle className={ styleClasses.Toggle } aria-controls="basic-navbar-nav"></Navbar.Toggle>

			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className = "mr-auto">
					<Link className={ styleClasses.Link } to="/">Home</Link>
					<Link className={ styleClasses.Link } to="/stars">Stars</Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};