import React from 'react';
import { PropTypes } from 'prop-types';
import ShareButtonDoneRecipes from './ShareButtonDoneRecipes';

export default function BodyFavoriteRecipes({ index, history, each }) {
  let AlcoholicAreaCategory;
  if (each.alcoholicOrNot.length > 0) {
    AlcoholicAreaCategory = each.alcoholicOrNot;
  } else {
    AlcoholicAreaCategory = `${each.area} - ${each.category}`;
  }

  const templateString = `/${each.type}s/${each.id}`;
  return (
    <section>
      <button
        type="button"
        onClick={ () => history.push(templateString) }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          alt="horizontal"
          src={ each.image }
          width="200px"
        />
      </button>
      <h1
        data-testid={ `${index}-horizontal-top-text` }
      >
        {AlcoholicAreaCategory}
      </h1>
      <button
        data-testid={ `${index}-horizontal-name` }
        type="button"
        onClick={ () => history.push(templateString) }
      >
        {each.name}
      </button>
      <ShareButtonDoneRecipes templateString={ templateString } index={ index } />

    </section>);
}

BodyFavoriteRecipes.propTypes = {
  history: PropTypes.shape(),
  each: PropTypes.shape(),
  index: PropTypes.number,
}.isRequired;
