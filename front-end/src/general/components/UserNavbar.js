import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout';
import '../css/header.css';

export default class UserNavbar extends React.Component {
	render() {
		const profile = `/members/${this.props.username}`;

		return (
			<Navbar collapseOnSelect fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/members">Matcha</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse className="text-center">
					<Nav pullRight>
						<NavItem eventKey={1} onClick={this.props.onClick}>
							Notifications <i className="fa fa-bell"></i>
						</NavItem>
						<NavItem eventKey={2} href='/members'>
							Members <i className="fa fa-users"></i>
						</NavItem>
						<NavItem eventKey={3} href='/messages'>
							Messages <i className="fa fa-comments"></i>
						</NavItem>
						<NavItem eventKey={4} href={profile}>
							My profile <i className="fa fa-user"></i>
						</NavItem>

						<Logout />

					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
