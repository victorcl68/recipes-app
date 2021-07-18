import React from 'react';
import { Button } from 'react-bootstrap';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { generateCorrectObj } from './functions';

export const makeRecipe = ({ url }, history) => {
  const mealOrDrink = url.split('/')[1];
  const id = url.split('/')[2];
  const mealCockTail = mealOrDrink === 'comidas' ? 'meals' : 'cocktails';
  const remnant = mealOrDrink === 'comidas' ? 'cocktails' : 'meals';
  const rawInProgressArrayVerifier = localStorage.getItem('inProgressRecipes');
  const inProgressArrayVerifier = JSON.parse(rawInProgressArrayVerifier);

  // inProgressArray doesn't exist: create it and add first in progress recipe
  if (!inProgressArrayVerifier) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    const inProgressRecipes = {
      [mealCockTail]: {
        [id]: [],
      },
      [remnant]: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    history.push(`/${mealOrDrink}/${id}/in-progress`);
  }

  if (inProgressArrayVerifier
    && !Object.keys(mealCockTail).some((obj) => obj.id === id)) {
    let recipeToAddToProgress = inProgressArrayVerifier[mealCockTail];
    const remnantObj = inProgressArrayVerifier[remnant];
    recipeToAddToProgress = {
      ...recipeToAddToProgress, [id]: [],
    };
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ [mealCockTail]: recipeToAddToProgress, [remnant]: remnantObj }));
  }
  history.push(`/${mealOrDrink}/${id}/in-progress`);
};

export const localStorageVerifier = (match, id, history) => {
  const pushString = match.url.split('/')[1];
  const rawInProgressArrayVerifier = localStorage.getItem('inProgressRecipes');
  const inProgressArrayVerifier = JSON.parse(rawInProgressArrayVerifier);
  let mealOrCockTail;
  if (!inProgressArrayVerifier) {
    const baseInProgressObj = { meals: {}, cocktails: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(baseInProgressObj));
  }
  if (inProgressArrayVerifier) {
    mealOrCockTail = pushString === 'comidas' ? 'meals'
      : 'cocktails';
  }

  if ((!inProgressArrayVerifier) || (inProgressArrayVerifier
    && !Object.keys(inProgressArrayVerifier[mealOrCockTail]).some((obj) => obj === id)
  )) {
    return (
      <Button
        variant="dark"
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe"
        onClick={ () => makeRecipe(match, history) }
      >
        Iniciar Receita
      </Button>
    );
  }

  if (inProgressArrayVerifier
    && Object.keys(inProgressArrayVerifier[mealOrCockTail]).some((obj) => obj === id)) {
    return (
      <Button
        variant="dark"
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe"
        onClick={ () => history.push(`/${pushString}/${id}/in-progress`) }
      >
        Continuar Receita
      </Button>
    );
  }
  const rawDoneRecipes = localStorage.getItem('doneRecipes');
  const doneRecipes = JSON.parse(rawDoneRecipes);
  if (doneRecipes && doneRecipes.find((recipe) => recipe.id === id)) {
    return null;
  }
};

export const verifyFavorite = (id) => {
  const rawFavorites = localStorage.getItem('favoriteRecipes');
  const favorites = JSON.parse(rawFavorites);
  if (favorites && favorites.find((fav) => fav.id === id)) {
    return blackHeartIcon;
  }
  return whiteHeartIcon;
};

export const settingFavorite = (details, id, refresh) => {
  const favoritesArrayVerifier = localStorage.getItem('favoriteRecipes');
  if (!favoritesArrayVerifier) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const rawFavoritesArray = localStorage.getItem('favoriteRecipes');
  const favoritesArray = JSON.parse(rawFavoritesArray);
  let favoriteObject = {};
  if (details.meals) {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = details.meals[0];
    favoriteObject = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
  }
  if (details.drinks) {
    const { idDrink,
      strCategory,
      strDrink,
      strDrinkThumb,
      strAlcoholic } = details.drinks[0];
    favoriteObject = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
  }

  if (!favoritesArray.find((obj) => obj.id === id)) {
    favoritesArray.push(favoriteObject);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesArray));
  } else {
    const RemovedFavoriteArray = favoritesArray.filter((obj) => obj.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(RemovedFavoriteArray));
  }
  return !refresh;
};

export const storageCheckGenerator = (id, index) => {
  const rawChecks = localStorage.getItem('inProgressCheck');
  const checks = JSON.parse(rawChecks);

  // inProgressCheck key doesn't exist yet
  if (!checks) {
    localStorage.setItem('inProgressCheck',
      JSON.stringify([{ id, checkboxes: { [index]: false } }]));
    return false;
  }

  // continue render case
  if (checks.some((obj) => obj.id === id)) {
    let nextObjValue = checks.find((obj) => obj.id === id);
    // se está populando um objeto sem chaves retorna falso, se tiver chaves retorna o valor do estado atual do local storage
    nextObjValue = { ...nextObjValue,
      checkboxes: { ...nextObjValue.checkboxes,
        [index]: nextObjValue.checkboxes[index]
          ? nextObjValue.checkboxes[index]
          : false } };
    const prepareNewState = checks.filter((obj) => obj.id !== id);
    localStorage.setItem('inProgressCheck',
      JSON.stringify([...prepareNewState, nextObjValue]));
    return false;
  }

  // render new page if inProgressCheck already exists
  if (!checks.some((obj) => obj.id === id)) {
    const generateNewCheckObject = { id, checkboxes: { [index]: false } };
    localStorage.setItem('inProgressCheck',
      JSON.stringify([...checks, generateNewCheckObject]));
  }

  return false;
};

export const storageCheckUpdater = (id, index, refresh) => {
  const rawChecks = localStorage.getItem('inProgressCheck');
  const checks = JSON.parse(rawChecks);
  if (checks.some((obj) => obj.id === id)) {
    const updateProgressObj = checks.find((obj) => obj.id === id);
    updateProgressObj.checkboxes[index] = !updateProgressObj.checkboxes[index];
    const prepareNewState = checks.filter((obj) => obj.id !== id);
    localStorage.setItem('inProgressCheck',
      JSON.stringify([...prepareNewState, updateProgressObj]));
    return !refresh;
  }
  return false;
};

export const checkBoolean = (id, index) => {
  const rawChecks = localStorage.getItem('inProgressCheck');
  const checks = JSON.parse(rawChecks);
  const checkValue = checks.find((obj) => obj.id === id);
  return checkValue.checkboxes[index];
};

export const disableFinishRecipeButton = (id) => {
  const rawChecks = localStorage.getItem('inProgressCheck');
  const checks = JSON.parse(rawChecks);
  const findObj = checks.find((obj) => obj.id === id);
  if (findObj
    && Object.values(findObj.checkboxes).every((checkbox) => checkbox === true)) {
    return false;
  }
  return true;
};

export const finishRecipe = (id, details, history) => {
  const rawDoneRecipes = localStorage.getItem('doneRecipes');
  const doneRecipes = JSON.parse(rawDoneRecipes);
  if (!doneRecipes) {
    const firstDoneRecipe = generateCorrectObj(details);
    localStorage.setItem('doneRecipes', JSON.stringify([firstDoneRecipe]));
  }
  if (doneRecipes && !doneRecipes.some((eachDone) => eachDone.id === id)) {
    const lastDoneRecipe = generateCorrectObj(details);
    const newArrayRecipe = [
      ...doneRecipes,
      lastDoneRecipe,
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(newArrayRecipe));
  }
  history.push('/receitas-feitas');
};
