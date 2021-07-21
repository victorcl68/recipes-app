import React from 'react';
import { Button } from 'react-bootstrap';

const exploreBtn = (word, term, handle) => (
  <Button
    style={ { margin: '5px', backgroundColor: 'brown' } }
    variant="outline-light"
    key={ term }
    type="button"
    data-testid={ `explore-${term}` }
    onClick={ handle }
  >
    {word}
  </Button>
);

export default function renderExporeBtn(handle, isDrink) {
  const exploreBy = {
    'Por Ingredientes': { testId: 'by-ingredient', url: 'ingredientes' },
    'Por Local de Origem': { testId: 'by-area', url: 'area' },
    'Me Surpreenda!': { testId: 'surprise', url: 'rand' },
  };

  if (isDrink) delete exploreBy['Por Local de Origem'];
  return Object.entries(exploreBy).map((key) => (
    exploreBtn(key[0], key[1].testId, () => handle(key[1].url))
  ));
}
