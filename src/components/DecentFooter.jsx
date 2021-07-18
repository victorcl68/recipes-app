import React from 'react';
import { Link } from 'react-router-dom';
import ExitButton from './ExitButton';
import home from '../images/home.png';
import '../App.css';

export default function DecentFooter() {
  return (
    <footer className="decent-footer">
      <Link to="/comidas">
        <img className="home" width="40px" src={ home } alt="Home Icon" />
      </Link>
      <Link className="sair" to="/">
        <ExitButton />
      </Link>
    </footer>
  );
}
