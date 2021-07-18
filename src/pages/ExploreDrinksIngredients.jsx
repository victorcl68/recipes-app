/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';

export default function ExploreDrinksIngredients() {
  const { filterList: { ingredients }, getByIngredients } = useContext(Context);
  const [isRedirect, setIsRedirect] = useState(false);

  const maxItems = 12;
  const handle = (ingredientName) => {
    getByIngredients('cocktail', ingredientName);
    setIsRedirect(true);
  };

  return isRedirect ? <Redirect to="/bebidas" /> : (
    <>
      <Header title="Explorar Ingredientes" />
      <Container>
        <Row>
          {ingredients.drinks && ingredients.drinks
            .slice(0, maxItems).map(({
              strIngredient1,
            }, index) => IngredientCard(strIngredient1, 'cocktail', index, handle))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}
