export const fetchAPI = async (baseEndPoint, filter, term) => {
  console.log(`${baseEndPoint}${filter}${term}`);
  try {
    const result = await fetch(baseEndPoint + filter + term)
      .then((res) => res.json());
    return result;
  } catch (error) {
    console.log(error);
    // retornar algo que renderize o erro na tela
  }
};

export const getFilters = async (filter) => {
  const mealsPoint = `https://www.themealdb.com/api/json/v1/1/${filter}list`;
  const drinksPoint = `https://www.thecocktaildb.com/api/json/v1/1/${filter}list`;
  return Object.assign({}, ...await Promise.all([fetch(mealsPoint), fetch(drinksPoint)])
    .then((responses) => Promise.all(responses.map((res) => res.json()))));
};
