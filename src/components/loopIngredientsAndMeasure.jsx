import React from 'react';
import { ListGroup } from 'react-bootstrap';
import {
  storageCheckGenerator,
  storageCheckUpdater,
  checkBoolean,
} from '../services/manageLocalStorage';

export default function loopIngredientsAndMeasure(
  mealOrDrinkArray,
  IngredientsAndMeasures,
  id,
  [refresh, setRefresh],
) {
  return (
    mealOrDrinkArray.map((_a, index) => (
      <ListGroup
        className={ storageCheckGenerator(id, index) ? 'showCss' : 'hideCss' }
        data-testid={ `${index}-ingredient-step` }
        key={ `ingredientAndMeasure${index + 1}` }
      >
        <ListGroup.Item className="checkboxes">
          <label htmlFor={ `${index}checkobox` }>
            <input
              id={ `${index}checkobox` }
              defaultChecked={ checkBoolean(id, index) }
              className={ checkBoolean(id, index) ? 'showCss' : 'hideCss' }
              key={ index }
              type="checkbox"
              onClick={ () => {
                setRefresh(storageCheckUpdater(id, index, refresh));
              } }
            />
            <span className={ checkBoolean(id, index) ? 'showCss' : 'hideCss' }>
              {' '}
              {IngredientsAndMeasures.ingredient[`strIngredient${index + 1}`]}
            </span>
            <span
              className={ checkBoolean(id, index) ? 'showCss' : 'hideCss' }
            >
              {IngredientsAndMeasures.measure[`strMeasure${index + 1}`]}
            </span>
          </label>
        </ListGroup.Item>
      </ListGroup>
    ))
  );
}
