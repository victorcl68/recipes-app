import React from 'react';
import { Card } from 'react-bootstrap';

export default function RecipeCard(recipe, index, history) {
  const recipeID = recipe.idMeal
    ? `/comidas/${recipe.idMeal}` : `/bebidas/${recipe.idDrink}`;
  const recipeType = Object.keys(recipe)[0].includes('Meal') ? 'Meal' : 'Drink';
  return (
    <Card
      key={ index }
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(recipeID) }
    >
      <Card.Img
        variant="top"
        src={ recipe[`str${recipeType}Thumb`] }
        alt={ recipe[`str${recipeType}`] }
        data-testid={ `${index}-card-img` }
      />
      <Card.Body style={ { padding: '10px 0' } }>
        <Card.Title style={ { padding: '5px 0' } } data-testid={ [`${index}-card-name`] }>
          {recipe[`str${recipeType}`]}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
