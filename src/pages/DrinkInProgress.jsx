import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card, CardColumns, Container } from 'react-bootstrap';
import loopIngredientsAndMeasure from '../components/loopIngredientsAndMeasure';
import Context from '../context/Context';
import DecentFooter from '../components/DecentFooter';
import { copyLinkInProgress } from '../services/functions';
import shareIcon from '../images/shareIcon.svg';
import { verifyFavorite, settingFavorite,
  disableFinishRecipeButton, finishRecipe } from '../services/manageLocalStorage';
import LoadingImg from '../components/LoadingImg';

export default function DrinkInProgress({ match, history, match: { params: { id } } }) {
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [check, setCheck] = useState();
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
  } = useContext(Context);

  useEffect(() => {
    detailsSyncSetState(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, []);

  if (details.drinks && id === details.drinks[0].idDrink) {
    const IngredientsAndMeasures = generateIngredientsAndMeasure(details.drinks[0]);
    const drinkArray = Object.keys(IngredientsAndMeasures.ingredient);

    if (!check) {
      const cssObject = {};
      drinkArray.forEach((_a, index) => { cssObject[index] = false; });
      setCheck(cssObject);
    }

    const {
      strDrinkThumb,
      strDrink,
      strInstructions,
      strCategory,
    } = details.drinks[0];

    return (
      <main className="general-background-color">
        <CardColumns className="d-flex justify-content-center">
          <Card style={ { width: '24rem' } }>
            <Card.Img
              variant="top"
              src={ strDrinkThumb }
              alt="Drink"
              width="100px"
              data-testid="recipe-photo"
            />
            <Card.Body>
              <Card.Title data-testid="recipe-title">
                {`Name: ${strDrink}`}
              </Card.Title>
              <Card.Text className="category" data-testid="recipe-category">
                {`Category: ${strCategory}`}
              </Card.Text>
            </Card.Body>
          </Card>
        </CardColumns>
        <section className="share-and-fav">
          <Button
            variant="outline-danger"
            type="button"
            data-testid="share-btn"
            onClick={ () => setIsCopied(copyLinkInProgress(match, isCopied)) }
          >
            {isCopied ? 'Link copiado!' : <img src={ shareIcon } alt="Share" />}
          </Button>
          <Button
            variant="outline-danger"
            type="button"
            onClick={ () => setRefresh(settingFavorite(details, id, refresh)) }
          >
            <img
              alt="Favorite"
              src={ verifyFavorite(id) }
              data-testid="favorite-btn"
            />
          </Button>
        </section>
        <br />
        <Container>
          <h3>Ingredients:</h3>
          {loopIngredientsAndMeasure(drinkArray,
            IngredientsAndMeasures,
            id,
            [refresh, setRefresh])}
          <br />
          <h3>Instrução:</h3>
          <div className="instructions" data-testid="instructions">{strInstructions}</div>
        </Container>
        <br />
        <DecentFooter />
        <Button
          variant="dark"
          className="finish-recipe"
          onClick={ () => finishRecipe(id, details.drinks, history) }
          disabled={ disableFinishRecipeButton(id) }
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </Button>
      </main>
    );
  }
  return (
    LoadingImg()
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape(), history: PropTypes.shape() }.isRequired;
