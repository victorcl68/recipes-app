import React from 'react';
import { Card, Button, CardColumns, Container } from 'react-bootstrap';
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
      </Button>
      <Container>
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
          <h1 className="h1-done-fav">{each.name}</h1>
        </Button>
        <ShareButtonDoneRecipes templateString={ templateString } index={ index } />
      </Container>
    </section>);
}

BodyFavoriteRecipes.propTypes = {
  history: PropTypes.shape(),
  each: PropTypes.shape(),
  index: PropTypes.number,
}.isRequired;
