import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';
import DecentFooter from '../components/DecentFooter';
import Header from '../components/Header';
import BodyRecipesDone from '../components/BodyRecipesDone';

export default function RecipesDone({ history }) {
  const [whatIsActivated, setWhatIsActivated] = useState(0);
  const rawDestructuredStorage = localStorage.getItem('doneRecipes');
  const destructuredStorage = JSON.parse(rawDestructuredStorage);
  const attStateFilter = (selected) => {
    setWhatIsActivated(selected);
  };
  const renderFilteredList = () => {
    let filteredList = [];
    if (whatIsActivated === 0) {
      filteredList = destructuredStorage;
    }
    if (whatIsActivated === 1) {
      filteredList = destructuredStorage
        .filter((eachOne) => eachOne.type === 'comida');
    }
    if (whatIsActivated === 2) {
      filteredList = destructuredStorage
        .filter((eachOne) => eachOne.type === 'bebida');
    }
    return (filteredList
      .map((each, index) => (
        <BodyRecipesDone
          key={ index }
          index={ index }
          history={ history }
          each={ each }
        />
      )));
  };
  return (
    <article>
      <Header title="Receitas Feitas" />
      <section className="buttons-done">
        <Button
          variant="outline-dark"
          data-testid="filter-by-all-btn"
          onClick={ () => attStateFilter(0) }
          type="button"
        >
          Todas
        </Button>
        <Button
          variant="outline-dark"
          data-testid="filter-by-food-btn"
          onClick={ () => attStateFilter(1) }
          type="button"
        >
          Comidas
        </Button>
        <Button
          variant="outline-dark"
          data-testid="filter-by-drink-btn"
          onClick={ () => attStateFilter(2) }
          type="button"
        >
          Bebidas
        </Button>
      </section>
      {destructuredStorage ? renderFilteredList() : null}
      <DecentFooter />
    </article>
  );
}

RecipesDone.propTypes = { history: PropTypes.shape() }.isRequired;
