import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div id="header">
        <Navbar className="header-navbar" light expand="md">
          <NavbarBrand href="/">
            <img className="logo" alt="Logo" src="/assets/images/logo.png"/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://web.facebook.com/Bambusca-401889657015248/">
                  <img alt="Facebook" src="/assets/images/facebook.png"/>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  <img alt="Twitter" src="/assets/images/twitter.png"/>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.instagram.com/bambusca_oficial/">
                  <img alt="Instagram" src="/assets/images/instagram.png"/>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header;