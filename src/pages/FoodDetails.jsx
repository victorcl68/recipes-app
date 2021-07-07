import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { makeRecipe } from '../services/manageLocalStorage';

function FoodDetails({ match, match: { params: { id } }, history }) {
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
    recomendationsDrinks,
  } = useContext(Context);

  useEffect(() => {
    if (!details.meals) {
      detailsSyncSetState(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, [details.meals, detailsSyncSetState, id]);

  const localStorageVerifier = () => {
    const rawStorageRecipe = localStorage.getItem('inProgressRecipes');
    const storageRecipe = JSON.parse(rawStorageRecipe);
    if ((!storageRecipe) || (storageRecipe
      && Object.keys(storageRecipe.meals)[0]
      !== id)) {
      return (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe"
          onClick={ () => makeRecipe(match, history) }
        >
          Iniciar Receita
        </button>
      );
    }
    if (storageRecipe
      && Object.keys(storageRecipe.meals)[0] === id) {
      return (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe"
          onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        >
          Continuar Receita
        </button>
      );
    }
    const rawDoneRecipes = localStorage.getItem('doneRecipes');
    const doneRecipes = JSON.parse(rawDoneRecipes);
    if (doneRecipes && doneRecipes.find((recipe) => recipe.id === id)) {
      return null;
    }
  };

  function loopIngredientsAndMeasure() {
    const IngredientsAndMeasures = generateIngredientsAndMeasure(details.meals[0]);
    const mealArray = Object.keys(IngredientsAndMeasures.ingredient);
    return (
      mealArray.map((_a, index) => (
        <section key={ `ingredientAndMeasure${index + 1}` }>
          <div data-testid={ `${index}-ingredient-name-and-measure` }>
            {IngredientsAndMeasures.ingredient[`strIngredient${index + 1}`]}
          </div>
          <div data-testid={ `${index}-ingredient-name-and-measure` }>
            {IngredientsAndMeasures.measure[`strMeasure${index + 1}`]}
          </div>
        </section>
      ))
    );
  }

  const loopRecomendationsDrinks = () => {
    const recommendationsNumber = 6;
    const slicedRecommendations = recomendationsDrinks.slice(0, recommendationsNumber);
    return (
      slicedRecommendations.map((drink, index) => (
        <div
          className={ index === 0 || index === 1 ? '' : 'carousel' }
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <h3 data-testid={ `${index}-recomendation-title` }>
            {drink.strDrink}
          </h3>
          <img src={ drink.strDrinkThumb } alt="recommendation drink" width="150px" />
        </div>
      ))
    );
  };

  if (details.meals && recomendationsDrinks) {
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
        >
          <img src={ shareIcon } alt="Share" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ whiteHeartIcon } alt="Share" />
        </button>
        <p data-testid="recipe-category">{strCategory}</p>
        <span data-testid="instructions">{strInstructions}</span>
        {loopIngredientsAndMeasure()}
        <iframe
          data-testid="video"
          src={ strYoutube.replace('watch?v=', 'embed/') }
          width="300px"
          title="Recipe"
        />
        <h3>Recomendações de Drinks</h3>
        {loopRecomendationsDrinks()}
        {localStorageVerifier()}
      </main>
    );
  }
  return (
    <p>Loading...</p>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default FoodDetails;
