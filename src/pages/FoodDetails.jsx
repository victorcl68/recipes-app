import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card, CardColumns } from 'react-bootstrap';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import { localStorageVerifier,
  verifyFavorite, settingFavorite } from '../services/manageLocalStorage';
import { copyLink } from '../services/functions';
import DecentFooter from '../components/DecentFooter';

function FoodDetails({ match, match: { params: { id } }, history }) {
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
    recomendations: { drinks },
  } = useContext(Context);

  useEffect(() => {
    detailsSyncSetState(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, []);

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
    const slicedRecommendations = drinks.slice(0, recommendationsNumber);
    return (
      slicedRecommendations.map((drink, index) => (
        <div
          className={ index === 0 || index === 1 ? '' : 'carousel' }
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <CardColumns>
            <Card>
              <Card.Img
                variant="top"
                src={ drink.strDrinkThumb }
                alt="recommendation drink"
                width="150px"
              />
              <Card.Body>
                <Card.Title data-testid={ `${index}-recomendation-title` }>
                  {drink.strDrink}
                </Card.Title>
              </Card.Body>
            </Card>
          </CardColumns>
          {/* <img src={ drink.strDrinkThumb } alt="recommendation drink" width="150px" />
          <h3 data-testid={ `${index}-recomendation-title` }>
            {drink.strDrink}
          </h3> */}
        </div>
      ))
    );
  };

  if (details.meals && drinks && id === details.meals[0].idMeal) {
    const {
      strMealThumb,
      strMeal,
      strInstructions,
      strCategory,
      strYoutube,
    } = details.meals[0];

    return (
      <main>
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
        {/* <img data-testid="recipe-photo" src={ strMealThumb } alt="Meal" width="200px" />
        <h1 data-testid="recipe-title">{strMeal}</h1> */}
        <Button
          variant="outline-warning"
          type="button"
          data-testid="share-btn"
          onClick={ () => setIsCopied(copyLink(match, isCopied)) }
        >
          <img src={ shareIcon } alt="Share" />
        </Button>
        {isCopied ? <p>Link copiado!</p> : null }
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
        <h3 className="category" data-testid="recipe-category">{strCategory}</h3>
        <h5 data-testid="instructions">{strInstructions}</h5>
        {loopIngredientsAndMeasure()}
        <iframe
          data-testid="video"
          src={ strYoutube.replace('watch?v=', 'embed/') }
          width="300px"
          title="Recipe"
        />
        <h4 className="recomendations">Recomendações de Drinks</h4>
        {loopRecomendationsDrinks()}
        <DecentFooter />
        {localStorageVerifier(match, id, history)}
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
