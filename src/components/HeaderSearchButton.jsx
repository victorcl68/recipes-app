import React, { useState } from 'react';
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
      {renderButton ? <HeaderSearchBar /> : null}
    </>
  );
}
