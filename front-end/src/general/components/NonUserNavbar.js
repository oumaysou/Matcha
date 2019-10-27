import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/header.css';

export default class NonUserNavbar extends React.Component {
    render() {
        return (
        <Navbar collapseOnSelect fixedTop>
    		<Navbar.Header>
    			<Navbar.Brand>
    				<Link to="/">Matcha</Link>
    			</Navbar.Brand>
    			<Navbar.Toggle />
    		</Navbar.Header>
    		<Navbar.Collapse className="text-center">
    			<Nav pullRight>
    				<NavItem eventKey={1} href='/'>
    					Sign In
    				</NavItem>
    				<NavItem eventKey={2} href='/register'>
    					Register
    				</NavItem>
    			</Nav>
    		</Navbar.Collapse>
    	</Navbar>
        );
    }
}
