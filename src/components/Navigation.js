import React from 'react';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="container-line_kk">
        <div className="container-navigation">

            <NavLink to="/home" className="Nav_link"
                     activeClassName="activeRoute"
                     activeStyle={{ color: 'white' }}> Domů </NavLink>
             |
            <NavLink to="/long_data_view"    className="Nav_link"
                     activeClassName="activeRoute"
                     activeStyle={{ color: 'white' }} > Zobrazení dlouhodobých dat </NavLink>
             |
            <NavLink to="/short_data_view" className="Nav_link"
                     activeClassName="activeRoute"
                     activeStyle={{ color: 'white' }}> Zobrazení krátkodobých dat </NavLink>
             |
            <NavLink to="/about_project" className="Nav_link"
                     activeClassName="activeRoute"
                     activeStyle={{ color: 'white' }}> O projektu </NavLink>
             |
        </div>
        </div>
    );
}

export default Navigation;