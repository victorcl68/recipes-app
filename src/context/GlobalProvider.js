/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { fetchAPI, getFilters } from '../services/fetchAPI';
import Context from './Context';
import initialData from '../data/initialData';

function GlobalProvider({ children }) {
  const { initialParams, mealEP, cocktailEP, filtersBy } = initialData;

  const [baseEndPoint, setBaseEndPoint] = useState(mealEP);
  const [requestParams, setRequestParams] = useState(initialParams);
  const [filterList, setFilterList] = useState(filtersBy);
  const [initialRecipes, setInitialRecipes] = useState({});
  const [recipesRender, setRecipesRender] = useState({ drinks: [], meals: [] });
  const [recomendations, setRecomendations] = useState({ drinks: [], meals: [] });
  const [details, setDetails] = useState({});
  const [toggle, setToggle] = useState({
    categoryName: '', status: false });
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function fetchInitialData() {
      const { chosenFilter, searchText } = initialParams;
      const resultMeals = await fetchAPI(mealEP, chosenFilter, searchText);
      const resultDrinks = await fetchAPI(cocktailEP, chosenFilter, searchText);
      setFilterList({ ...filterList,
        categories: await getFilters('list.php?c='),
        ingredients: await getFilters('list.php?i='),
        area: await getFilters('list.php?a=') });
      setInitialRecipes({
        meals: Object.values(resultMeals)[0],
        drinks: Object.values(resultDrinks)[0] });
      setRecomendations({ ...recomendations,
        meals: resultMeals.meals,
        drinks: resultDrinks.drinks });
      setRecipesRender({
        meals: resultMeals.meals,
        drinks: resultDrinks.drinks });
    } fetchInitialData();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setRequestParams({ ...requestParams, [name]: value });
  };

  const handleRender = (result) => {
    const key = Object.keys(result)[0];
    setRecipesRender({ ...recipesRender, [key]: result[key] });
  };

  const handleToggle = (categoryName, status) => {
    if (categoryName === toggle.categoryName || toggle.categoryName === '') {
      setToggle({ categoryName, status });
    } else {
      setToggle({ categoryName, status });
    }
  };

  const updateEndPoint = (type) => {
    if (type === 'drinks') {
      setBaseEndPoint(cocktailEP);
    } else setBaseEndPoint(mealEP);
  };

  const resetParams = () => {
    setRequestParams(initialParams);
  }; // usar isso para resolver permanencia dos parametros quando alterna entre drinks e foods

  const manageRenderMeal = (cardList) => {
    const { meals } = recipesRender;
    if (meals.length === 1 && requestParams.searchText.length > 0) {
      const mealId = meals[0].idMeal;
      return <Redirect to={ `/comidas/${mealId}` } />;
    } if (meals.length >= 1) {
      return cardList;
    }
  };

  const manageRenderDrink = (cardList) => {
    const { drinks } = recipesRender;
    if (drinks.length === 1 && requestParams.searchText.length > 0) {
      const drinkId = drinks[0].idDrink;
      return <Redirect to={ `/bebidas/${drinkId}` } />;
    } if (drinks.length >= 1) {
      return cardList;
    }
  };

  const generateIngredientsAndMeasure = (object) => {
    const FatherObject = {
      ingredient: {},
      measure: {},
    };
    Object.keys(object).forEach((eachKey) => {
      if ((eachKey.includes('strMeasure'))
      && (object[eachKey] !== '' && object[eachKey] !== null)) {
        FatherObject.measure[eachKey] = object[eachKey];
      }
      if ((eachKey.includes('strIngredient'))
      && (object[eachKey] !== '' && object[eachKey] !== null)) {
        FatherObject.ingredient[eachKey] = object[eachKey];
      }
    });
    return FatherObject;
  };

  const randomRecipe = async () => {
    const response = await fetchAPI(baseEndPoint, 'random.php', '');
    if (response.meals) {
      return response.meals[0].idMeal;
    } return response.drinks[0].idDrink;
  };

  const asyncSetState = async () => {
    const { chosenFilter, searchText } = requestParams;
    const result = await fetchAPI(baseEndPoint, chosenFilter, searchText);
    if (!result[Object.keys(result)[0]]) {
      global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    } else if (result) {
      handleRender(result);
    }
  };

  const detailsSyncSetState = async (endPoint) => {
    const result = await fetchAPI(endPoint, '', '');
    if (result) {
      setDetails(result);
    }
  };

  const filterCategory = async (category) => {
    const filterType = 'filter.php?c=';
    let resultFilter = {};
    if (category) {
      resultFilter = await fetchAPI(baseEndPoint, filterType, category);
      if (resultFilter.meals) {
        setRecipesRender({ ...recipesRender,
          meals: resultFilter[Object.keys(resultFilter)[0]] });
      } else {
        setRecipesRender({ ...recipesRender,
          drinks: resultFilter[Object.keys(resultFilter)[0]] });
      }
    } else if (baseEndPoint === mealEP) {
      setRecipesRender({ ...recipesRender, meals: initialRecipes.meals });
    } else {
      setRecipesRender({ ...recipesRender, drinks: initialRecipes.drinks });
    }
  };

  const getByIngredients = async (part, str) => {
    const result = await fetchAPI(
      `https://www.the${part}db.com/api/json/v1/1/`,
      'filter.php?i=',
      str,
    );
    if (result.meals) {
      setRecipesRender({ ...recipesRender, meals: result.meals });
    } else {
      setRecipesRender({ ...recipesRender, drinks: result.drinks });
    }
  };

  const contextValue = {
    baseEndPoint,
    requestParams,
    details,
    recomendations,
    toggle,
    refresh,
    filterList,
    recipesRender,
    resetParams,
    updateEndPoint,
    handleChange,
    asyncSetState,
    manageRenderMeal,
    manageRenderDrink,
    setDetails,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
    filterCategory,
    handleToggle,
    setRefresh,
    randomRecipe,
    getByIngredients,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

export default GlobalProvider;

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
