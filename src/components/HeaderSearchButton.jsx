import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';

export default function HeaderSearchButton() {
  const [renderButton, setRenderButton] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={ () => { setRenderButton(!renderButton); } }
      >
        <img
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
        />
      </Button>
      {renderButton ? <HeaderSearchBar /> : null}
    </>
  );
}
