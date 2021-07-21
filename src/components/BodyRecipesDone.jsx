import React from 'react';
import { Button, Card, CardGroup, Container } from 'react-bootstrap';
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
    <Container>
      <Button
        variant="outline"
        type="button"
        onClick={ () => history.push(templateString) }
      >
        <CardGroup>
          <Card style={ { width: '24rem' } }>
            <Card.Img
              variant="top"
              data-testid={ `${index}-horizontal-image` }
              alt="horizontal"
              src={ each.image }
              width="200px"
            />
          </Card>
        </CardGroup>
      </Button>
      <Container>
        <Button
          variant="outline-dark"
          data-testid={ `${index}-horizontal-name` }
          type="button"
          onClick={ () => history.push(templateString) }
        >
          <h1 className="h1-done-fav">{each.name}</h1>
        </Button>
        <h3 data-testid={ `${index}-Pasta-horizontal-tag` }>{each.tags[0]}</h3>
        <h3 data-testid={ `${index}-Curry-horizontal-tag` }>{each.tags[1]}</h3>
        <h4
          data-testid={ `${index}-horizontal-top-text` }
        >
          {AlcoholicAreaCategory}
        </h4>
        <ShareButtonDoneRecipes templateString={ templateString } index={ index } />
        <h5 data-testid={ `${index}-horizontal-done-date` }>{each.doneDate}</h5>
      </Container>
    </Container>);
}

BodyRecipesDone.propTypes = {
  history: PropTypes.shape(),
  each: PropTypes.shape(),
  index: PropTypes.number,
}.isRequired;
