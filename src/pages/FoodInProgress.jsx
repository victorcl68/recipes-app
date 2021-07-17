import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
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
      <main>
        <img data-testid="recipe-photo" src={ strMealThumb } alt="Meal" width="200px" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => setIsCopied(copyLinkInProgress(match, isCopied)) }
        >
          {isCopied ? 'Link copiado!' : <img src={ shareIcon } alt="Share" />}
        </button>
        <button
          type="button"
          onClick={ () => setRefresh(settingFavorite(details, id, refresh)) }
        >
          <img
            alt="Favorite"
            src={ verifyFavorite(id) }
            data-testid="favorite-btn"
          />
        </button>
        <p data-testid="recipe-category">{strCategory}</p>
        <span data-testid="instructions">{strInstructions}</span>
        {loopIngredientsAndMeasure(mealArray,
          IngredientsAndMeasures,
          id,
          [refresh, setRefresh])}
        <iframe
          data-testid="video"
          src={ strYoutube.replace('watch?v=', 'embed/') }
          width="300px"
          title="Recipe"
        />
        <DecentFooter />
        <button
          className="finish-recipe"
          onClick={ () => finishRecipe(id, details.meals, history) }
          disabled={ disableFinishRecipeButton(id) }
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </button>
      </main>
    );
  }
  return (
    <p>Loading...</p>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.shape(), history: PropTypes.shape() }.isRequired;
