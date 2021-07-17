import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card, CardColumns } from 'react-bootstrap';
import Context from '../context/Context';
import DecentFooter from '../components/DecentFooter';
import shareIcon from '../images/shareIcon.svg';
import { localStorageVerifier,
  verifyFavorite, settingFavorite } from '../services/manageLocalStorage';
import { copyLink } from '../services/functions';

export default function DrinkDetails({ match, match: { params: { id } }, history }) {
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
    initialRecipes: { meals },
  } = useContext(Context);

  useEffect(() => {
    detailsSyncSetState(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, []);

  function loopIngredientsAndMeasure() {
    const IngredientsAndMeasures = generateIngredientsAndMeasure(details.drinks[0]);
    const drinksArray = Object.keys(IngredientsAndMeasures.ingredient);
    return (
      drinksArray.map((_a, index) => (
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

  const loopRecomendationsFoods = () => {
    const recommendationsNumber = 6;
    const slicedRecommendations = meals.slice(0, recommendationsNumber);
    return (
      slicedRecommendations.map((meal, index) => (
        <div
          className={ index === 0 || index === 1 ? '' : 'carousel' }
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <CardColumns>
            <Card>
              <Card.Img
                variant="top"
                src={ meal.strMealThumb }
                alt="recommendation meal"
                width="150px"
              />
              <Card.Body>
                <Card.Title data-testid={ `${index}-recomendation-title` }>
                  {meal.strMeal}
                </Card.Title>
              </Card.Body>
            </Card>
          </CardColumns>
        </div>
      ))
    );
  };

  if (details.drinks && meals && id === details.drinks[0].idDrink) {
    const {
      strDrinkThumb,
      strDrink,
      strInstructions,
      strAlcoholic,
    } = details.drinks[0];

    return (
      <main>
        <CardColumns>
          <Card>
            <Card.Img
              variant="top"
              src={ strDrinkThumb }
              alt="Drink"
              width="200px"
              data-testid="recipe-photo"
            />
            <Card.Body>
              <Card.Title data-testid="recipe-title">
                {strDrink}
              </Card.Title>
            </Card.Body>
          </Card>
        </CardColumns>
        <Button
          variant="outline-warning"
          type="button"
          data-testid="share-btn"
          onClick={ () => setIsCopied(copyLink(match, isCopied)) }
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
        <h3 className="category" data-testid="recipe-category">
          {strAlcoholic}
        </h3>
        <h5 data-testid="instructions">{strInstructions}</h5>
        {loopIngredientsAndMeasure()}
        <h4 className="recomendations">Recomendações de Comidas</h4>
        {loopRecomendationsFoods()}
        <DecentFooter />
        {localStorageVerifier(match, id, history)}
      </main>
    );
  }
  return (
    <p>Loading...</p>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape(), history: PropTypes.shape() }.isRequired;
