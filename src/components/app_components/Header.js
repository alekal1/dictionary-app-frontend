import React, {Component} from 'react';

// Bootstrap components
import {Navbar, Nav} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

class Header extends Component {
    render() {
        return (
            <>
                <Navbar collapseOnSelect expand={'md'} bg={'dark'} variant={"dark"} fixed={"top"}>
                    <LinkContainer to={'/'}>
                        <Navbar.Brand>
                            Dictionary
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls={'sudoku-nav'}/>
                    <Navbar.Collapse id={'sudoku-nav'}>
                        <Nav className={'mr-md-auto'}>
                            <LinkContainer to={'/est'}>
                                <Nav.Link>
                                    EST-ENG
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/eng'}>
                                <Nav.Link>
                                    ENG-EST
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }
}

export default Header;