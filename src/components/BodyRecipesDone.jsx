import React from 'react';
import { Button, Card, CardColumns } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import ShareButtonDoneRecipes from './ShareButtonDoneRecipes';

export default function BodyRecipesDone({ index, history, each }) {
  let AlcoholicAreaCategory;
  if (each.alcoholicOrNot.length > 0) {
    AlcoholicAreaCategory = each.alcoholicOrNot;
  } else {
    AlcoholicAreaCategory = `${each.area} - ${each.category}`;
  }
  const templateString = `/${each.type}s/${each.id}`;
  return (
    <section>
      <Button
        variant="outline"
        type="button"
        onClick={ () => history.push(templateString) }
      >
        <CardColumns>
          <Card>
            <Card.Img
              variant="top"
              data-testid={ `${index}-horizontal-image` }
              alt="horizontal"
              src={ each.image }
              width="200px"
            />
          </Card>
        </CardColumns>
        {/* <img
          data-testid={ `${index}-horizontal-image` }
          alt="horizontal"
          src={ each.image }
          width="200px"
        /> */}
      </Button>
      <h1
        data-testid={ `${index}-horizontal-top-text` }
      >
        {AlcoholicAreaCategory}
      </h1>
      <Button
        variant="outline-dark"
        data-testid={ `${index}-horizontal-name` }
        type="button"
        onClick={ () => history.push(templateString) }
      >
        {each.name}
      </Button>
      <ShareButtonDoneRecipes templateString={ templateString } index={ index } />
      <h4 data-testid={ `${index}-horizontal-done-date` }>{each.doneDate}</h4>
      <h4 data-testid={ `${index}-Pasta-horizontal-tag` }>{each.tags[0]}</h4>
      <h4 data-testid={ `${index}-Curry-horizontal-tag` }>{each.tags[1]}</h4>
    </section>);
}

BodyRecipesDone.propTypes = {
  history: PropTypes.shape(),
  each: PropTypes.shape(),
  index: PropTypes.number,
}.isRequired;
