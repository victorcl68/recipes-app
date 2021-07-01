import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

function Header({ title }) {
  return (
    <header>
      <Link to="/perfil">
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </Link>
      <h3 data-testid="page-title">{title}</h3>
    </header>
    // lógica de componentização do header baseado na lógica do próprio arquivo de teste da trybe
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
