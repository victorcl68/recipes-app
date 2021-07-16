/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';

export default function ExploreFoodsIngredients() {
  const { filterList: { ingredients }, getByIngredients } = useContext(Context);
  const [isRedirect, setIsRedirect] = useState(false);

  const maxItems = 12;
  const handle = (ingredientName) => {
    getByIngredients('meal', ingredientName);
    setIsRedirect(true);
  };

  return isRedirect ? <Redirect to="/comidas" /> : (
    <>
      <div>Tela de explorar comidas ingredientes</div>
      <Header title="Explorar Ingredientes" />
      <Container>
        <Row>
          {ingredients.meals && ingredients.meals
            .slice(0, maxItems).map(({
              strIngredient,
            }, index) => IngredientCard(strIngredient, 'meal', index, handle))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}
