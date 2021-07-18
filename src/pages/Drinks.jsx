/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Button, CardColumns, Container } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import Context from '../context/Context';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import CategoryBtn from '../components/CategoryBtn';

export default function Drinks({ history }) {
  const {
    recipesRender: { drinks },
    filterList: { categories },
    manageRenderDrink,
    filterCategory,
    updateEndPoint,
    toggle,
    handleToggle,
    resetParams,
  } = useContext(Context);

  useEffect(() => {
    updateEndPoint('drinks');
    return () => resetParams();
  }, []);

  const maxRecipe = 12;
  const maxCategory = 5;
  const render = drinks.length > 0 && categories;

  const drinkList = () => drinks.slice(0, maxRecipe).map((drink, index) => (
    RecipeCard(drink, index, history)));

  const categoryList = () => categories.drinks.slice(0, maxCategory)
    .map(({ strCategory }) => (
      CategoryBtn(strCategory, filterCategory, handleToggle, toggle)));
  const renderList = (
    <div>
      <Container>
        <Button
          variant="outline-dark"
          type="button"
          data-testid="All-category-filter"
          onClick={ () => {
            filterCategory();
            handleToggle('', false);
          } }
        >
          All
        </Button>
        {categoryList()}
      </Container>
      <CardColumns>
        {drinkList()}
      </CardColumns>
    </div>
  );

  return (
    <main className="main-drinks">
      <HeaderSearchButton />
      <Header title="Bebidas" />
      <Container>
        {render ? manageRenderDrink(renderList) : <div>Loading...</div>}
      </Container>
      <Footer />
    </main>
  );
}

Drinks.propTypes = { history: PropTypes.shape() }.isRequired;
