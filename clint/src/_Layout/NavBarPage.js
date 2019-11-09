import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom'
import {logoutUser} from '../actions/Auth'
import {connect} from 'react-redux'

const NavBarPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const Logout = () =>{
    props.logoutUser();
  }
  const {name,lname,email,} = props.user
        const authLinks = (
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    {name+lname}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem divider />   
                    <Link to='/profile' className='dropdown-item'>Profile</Link>
                  <DropdownItem onClick={Logout}> 
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
          )
      const LoginLink = (
            <React.Fragment>
              <NavItem>
                <Link to='/register' className='nav-link'>Register</Link>
              </NavItem>
              <NavItem>
                <Link to='/login' className='nav-link'>Login</Link>
              </NavItem>
            </React.Fragment>
          )
  return (
    <div>
      <Navbar color="faded" light expand="md"  className='bg-info'>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
              {props.isAuthenticated ? authLinks : LoginLink}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated,
  user:state.auth.user
})
export default connect(mapStateToProps,{logoutUser})(NavBarPage);