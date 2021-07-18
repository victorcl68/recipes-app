import initialData from '../data/initialData';

const { mealEP, cocktailEP, initialParams: { chosenFilter, searchText } } = initialData;

export const getFilters = async (firstEP, secondEP, filter) => {
  const mealsPoint = firstEP + filter;
  const drinksPoint = secondEP + filter;
  return Object.assign({}, ...await Promise.all([fetch(mealsPoint), fetch(drinksPoint)])
    .then((responses) => Promise.all(responses.map((res) => res.json()))));
};

export const fetchAPI = async (baseEndPoint, filter, term) => {
  if (!baseEndPoint && !filter && !term) {
    return getFilters(mealEP, cocktailEP, chosenFilter + searchText);
  } try {
    const result = await fetch(baseEndPoint + filter + term)
      .then((res) => res.json());
    return result;
  } catch (error) {
    console.log(error);
  }
};
