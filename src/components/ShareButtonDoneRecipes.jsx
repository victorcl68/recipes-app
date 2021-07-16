import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { copyLinkDoneRecipes } from '../services/functions';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButtonDoneRecipes({ templateString, index }) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={ () => setIsCopied(
          copyLinkDoneRecipes(templateString, isCopied),
        ) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="shareIcon"
        />
      </button>
      {isCopied && <spam>Link copiado!</spam>}
    </div>
  );
}

ShareButtonDoneRecipes.propTypes = {
  templateString: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
