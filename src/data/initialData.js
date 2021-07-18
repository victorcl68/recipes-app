const initialData = {
  initialParams: { chosenFilter: 'search.php?s=', searchText: '' },
  mealEP: 'https://www.themealdb.com/api/json/v1/1/',
  cocktailEP: 'https://www.thecocktaildb.com/api/json/v1/1/',
  resultApi: { drinks: [], meals: [] },
  filtersBy: {
    area: { drinks: [], meals: [] },
    categories: { drinks: [], meals: [] },
    ingredients: { drinks: [], meals: [] },
  },
  recipesRender: { drinks: [], meals: [] },
  toogle: { categoryName: '', status: false },
};

export default initialData;
