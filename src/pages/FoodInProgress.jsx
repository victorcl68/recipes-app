import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card, CardColumns } from 'react-bootstrap';
import loopIngredientsAndMeasure from '../components/loopIngredientsAndMeasure';
import Context from '../context/Context';
import { copyLinkInProgress } from '../services/functions';
import DecentFooter from '../components/DecentFooter';
import shareIcon from '../images/shareIcon.svg';
import { verifyFavorite,
  settingFavorite,
  disableFinishRecipeButton,
  finishRecipe } from '../services/manageLocalStorage';

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
        <CardColumns>
          <Card>
            <Card.Img
              variant="top"
              src={ strMealThumb }
              alt="Meal"
              width="200px"
              data-testid="recipe-photo"
            />
            <Card.Body>
              <Card.Title data-testid="recipe-title">
                {strMeal}
              </Card.Title>
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
        <h3 className="category" data-testid="recipe-category">{strCategory}</h3>
        <h5 className="instructions" data-testid="instructions">{strInstructions}</h5>
        {loopIngredientsAndMeasure(mealArray,
          IngredientsAndMeasures,
          id,
          [refresh, setRefresh])}
        <iframe
          className="iframe"
          data-testid="video"
          src={ strYoutube.replace('watch?v=', 'embed/') }
          width="300px"
          title="Recipe"
        />
        <DecentFooter />
        <Button
          variant="dark"
          className="finish-recipe"
          onClick={ () => finishRecipe(id, details.meals, history) }
          disabled={ disableFinishRecipeButton(id) }
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </Button>
      </main>
    );
  }
  return (
    <p>Loading...</p>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.shape(), history: PropTypes.shape() }.isRequired;
