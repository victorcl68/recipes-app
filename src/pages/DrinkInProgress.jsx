import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import loopIngredientsAndMeasure from '../components/loopIngredientsAndMeasure';
import Context from '../context/Context';
import DecentFooter from '../components/DecentFooter';
import { copyLinkInProgress } from '../services/functions';
import shareIcon from '../images/shareIcon.svg';
import { verifyFavorite, settingFavorite,
  disableFinishRecipeButton, finishRecipe } from '../services/manageLocalStorage';

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
      <main>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt="Drink" width="200px" />
        <h1 data-testid="recipe-title">{strDrink}</h1>
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
        {loopIngredientsAndMeasure(drinkArray,
          IngredientsAndMeasures,
          id,
          [refresh, setRefresh])}
        <h3>Recomendações de Drinks</h3>
        <button
          onClick={ () => finishRecipe(id, details.drinks, history) }
          disabled={ disableFinishRecipeButton(id) }
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </button>
        <DecentFooter />
      </main>
    );
  }
  return (
    <p>Loading...</p>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape(), history: PropTypes.shape() }.isRequired;
