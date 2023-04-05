/*
 * Copyright (c) 2023. Created by Andras Laczo.
 */

import React, {useEffect, useState} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

const AppNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">
                Home
            </NavbarBrand>
            <NavbarToggler onClick={() => {
                setIsOpen(!isOpen)
            }}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="justify-content-between" style={{width: "100%"}} navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/persons">List and edit</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/newperson"><strong>Add person</strong></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/Bando85">GitHub</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default AppNavbar;