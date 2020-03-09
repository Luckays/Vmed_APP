import React from 'react';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <NavLink to="/">Domů | </NavLink>
            <NavLink to="/long_data_view">Zobrazení dlouhodobých dat | </NavLink>
            <NavLink to="/short_data_view">Zobrazení krátkodobých dat | </NavLink>
            <NavLink to="/about_project">O projektu |</NavLink>
        </div>
    );
}

export default Navigation;