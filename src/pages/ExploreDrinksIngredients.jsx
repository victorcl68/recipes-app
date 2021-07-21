/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import LoadingImg from '../components/LoadingImg';

export default function ExploreDrinksIngredients() {
  const { filterList: { ingredients }, getByIngredients } = useContext(Context);
  const [isRedirect, setIsRedirect] = useState(false);

  const maxItems = 12;
  const handle = (ingredientName) => {
    getByIngredients('cocktail', ingredientName);
    setIsRedirect(true);
  };

  return isRedirect ? <Redirect to="/bebidas" /> : (
    <main className="general-background-color space-footer">
      <Header title="Explorar Ingredientes" />
      {ingredients.drinks.length > 0
        ? (
          <Container className="d-flex flex-wrap justify-content-center">
            {ingredients.drinks.slice(0, maxItems).map(({ strIngredient1 },
              index) => IngredientCard(strIngredient1, 'cocktail', index, handle))}
          </Container>)
        : LoadingImg()}
      <Footer />
    </main>
  );
}
