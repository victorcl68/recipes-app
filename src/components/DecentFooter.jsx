import React from 'react';
import { Link } from 'react-router-dom';
import ExitButton from './ExitButton';
import goBackIcon from '../images/go-back.png';
// import drinkIcon from '../images/drinkIcon.svg';
// import exploreIcon from '../images/exploreIcon.svg';
// import mealIcon from '../images/mealIcon.svg';
import '../App.css';

export default function DecentFooter() {
  return (
    <footer className="decent-footer">
      <Link to="/comidas">
        <img className="voltar" width="40px" src={ goBackIcon } alt="Go Back Icon" />
      </Link>
      <Link className="sair" to="/">
        <ExitButton />
      </Link>
    </footer>
  );
}
