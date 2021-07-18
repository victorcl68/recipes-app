import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';

export default function HeaderSearchButton() {
  const [renderButton, setRenderButton] = useState(false);

  return (
    <>
      <button type="button" onClick={ () => { setRenderButton(!renderButton); } }>
        <img
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
        />
      </button>
      {renderButton ? (<Container fluid="sm"><HeaderSearchBar /></Container>) : null}
    </>
  );
}
