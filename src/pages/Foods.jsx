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
import LoadingImg from '../components/LoadingImg';

export default function Foods({ history }) {
  const {
    recipesRender: { meals },
    filterList: { categories },
    manageRenderMeal,
    filterCategory,
    updateEndPoint,
    toggle,
    handleToggle,
    resetParams,
  } = useContext(Context);

  useEffect(() => {
    updateEndPoint('food');
    return () => resetParams();
  }, []);

  const maxRecipe = 12;
  const maxCategory = 5;
  const render = meals.length > 0 && categories;

  const foodList = () => meals.slice(0, maxRecipe).map((meal, index) => (
    RecipeCard(meal, index, history)));

  const categoryList = () => categories.meals.slice(0, maxCategory)
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
        {foodList()}
      </CardColumns>
    </div>
  );

  return (
    <main className="general-background-color space-footer">
      <Header title="Comidas" />
      <Container>
        <HeaderSearchButton />
        {render
          ? manageRenderMeal(renderList)
          : LoadingImg()}
      </Container>
      <Footer />
    </main>
  );
}

Foods.propTypes = { history: PropTypes.shape() }.isRequired;
