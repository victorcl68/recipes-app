import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card, CardColumns, Container } from 'react-bootstrap';
import loopIngredientsAndMeasure from '../components/loopIngredientsAndMeasure';
import Context from '../context/Context';
import { copyLinkInProgress } from '../services/functions';
import DecentFooter from '../components/DecentFooter';
import shareIcon from '../images/shareIcon.svg';
import { verifyFavorite, settingFavorite, disableFinishRecipeButton,
  finishRecipe } from '../services/manageLocalStorage';
import LoadingImg from '../components/LoadingImg';

export default function FoodInProgress({ history, match, match: { params: { id } } }) {
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [check, setCheck] = useState();
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
  } = useContext(Context);

  useEffect(() => {
    detailsSyncSetState(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, []);

  if (details.meals && id === details.meals[0].idMeal) {
    const IngredientsAndMeasures = generateIngredientsAndMeasure(details.meals[0]);
    const mealArray = Object.keys(IngredientsAndMeasures.ingredient);

    if (!check) {
      const cssObject = {};
      mealArray.forEach((_a, index) => { cssObject[index] = false; });
      setCheck(cssObject);
    }

    const {
      strMealThumb,
      strMeal,
      strInstructions,
      strCategory,
      strYoutube,
    } = details.meals[0];

    return (
      <main className="general-background-color">
        <CardColumns className="d-flex justify-content-center">
          <Card style={ { width: '24rem' } }>
            <Card.Img
              variant="top"
              src={ strMealThumb }
              alt="Meal"
              width="100px"
              data-testid="recipe-photo"
            />
            <Card.Body>
              <Card.Title data-testid="recipe-title">
                {`Name: ${strMeal}`}
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
          {loopIngredientsAndMeasure(mealArray,
            IngredientsAndMeasures,
            id,
            [refresh, setRefresh])}
          <br />
          <h3>Instrução:</h3>
          <div className="instructions" data-testid="instructions">{strInstructions}</div>
          <iframe
            className="iframe"
            data-testid="video"
            src={ strYoutube.replace('watch?v=', 'embed/') }
            width="300px"
            title="Recipe"
          />
        </Container>
        <br />
        <DecentFooter />
        <Button
          variant="dark"
          className="finish-recipe"
          onClick={ () => finishRecipe(id, details.meals, history) }
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

FoodInProgress.propTypes = {
  match: PropTypes.shape(), history: PropTypes.shape() }.isRequired;
