import React from 'react';
import { Card } from 'react-bootstrap';

export default function IngredientCard(strIng, urlPart, index, func) {
  return (
    <Card
      key={ index }
      data-testid={ `${index}-ingredient-card` }
      style={ { width: '180px', margin: '5px' } }
      onClick={ () => func(strIng) }
    >
      <Card.Img
        variant="top"
        src={ `https://www.the${urlPart}db.com/images/ingredients/${strIng}-Small.png` }
        alt={ strIng }
        data-testid={ `${index}-card-img` }
      />
      <Card.Body>
        <Card.Title data-testid={ `${index}-card-name` }>
          {strIng}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
