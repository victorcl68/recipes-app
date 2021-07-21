import React from 'react';
import { Button } from 'react-bootstrap';

export default function CategoryBtn(category, func, handleToggle, toggle) {
  const submitFilter = () => {
    if (toggle.categoryName !== category) {
      func(category);
      handleToggle(category, true);
    } else {
      func();
      handleToggle('', false);
    }
  };

  return (
    <Button
      style={ { margin: '2px', backgroundColor: 'brown' } }
      variant="outline-light"
      data-testid={ `${category}-category-filter` }
      type="button"
      key={ category }
      onClick={ () => submitFilter() }
    >
      { category }
    </Button>
  );
}
