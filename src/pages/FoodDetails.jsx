import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card, CardColumns, CardGroup, Container, ListGroup }
  from 'react-bootstrap';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import { localStorageVerifier,
  verifyFavorite, settingFavorite } from '../services/manageLocalStorage';
import { copyLink } from '../services/functions';
import DecentFooter from '../components/DecentFooter';

export default function FoodDetails({ match, match: { params: { id } }, history }) {
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
    initialRecipes: { drinks },
  } = useContext(Context);

  useEffect(() => {
    detailsSyncSetState(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, []);

  function loopIngredientsAndMeasure() {
    const IngredientsAndMeasures = generateIngredientsAndMeasure(details.meals[0]);
    const mealArray = Object.keys(IngredientsAndMeasures.ingredient);
    return (
      mealArray.map((_a, index) => (
        <ListGroup key={ `ingredientAndMeasure${index + 1}` }>
          <ListGroup.Item>
            <span data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${IngredientsAndMeasures.ingredient[`strIngredient${index + 1}`]} - `}
            </span>
            <span data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${IngredientsAndMeasures.measure[`strMeasure${index + 1}`]}`}
            </span>
          </ListGroup.Item>
        </ListGroup>
      ))
    );
  }

  const loopRecomendationsDrinks = () => {
    const recommendationsNumber = 6;
    const slicedRecommendations = drinks.slice(0, recommendationsNumber);
    return (
      <Container>
        <CardGroup>
          {slicedRecommendations.map((drink, index) => (
            <Card
              key={ index }
              hidden={ index === 0 || index === 1 ? '' : 'true' }
              data-testid={ `${index}-recomendation-card` }
            >
              <Card.Img
                variant="top"
                src={ drink.strDrinkThumb }
                alt="recommendation drink"
              />
              <Card.Body>
                <Card.Title data-testid={ `${index}-recomendation-title` }>
                  {drink.strDrink}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
      </Container>
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
      <main className="general-background-color">
        <CardColumns className="d-flex justify-content-center">
          <Card style={ { width: '24rem' } }>
            <Card.Img
              variant="top"
              src={ strMealThumb }
              alt="Meal"
              width="100px"
              data-testid="recipe-photo"
            />
            <Card.Body>
              <Card.Title data-testid="recipe-title">
                {`Name: ${strMeal}`}
              </Card.Title>
              <Card.Text className="category" data-testid="recipe-category">
                {`Category: ${strCategory}`}
              </Card.Text>
            </Card.Body>
          </Card>
        </CardColumns>
        <section className="share-and-fav">
          <Button
            variant="outline-danger"
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
        </section>
        <br />
        <Container>
          <h3>Ingredients:</h3>
          {loopIngredientsAndMeasure()}
          <br />
          <h3>Instrução:</h3>
          <div className="instructions" data-testid="instructions">
            {strInstructions}
          </div>
          <iframe
            className="iframe"
            data-testid="video"
            src={ strYoutube.replace('watch?v=', 'embed/') }
            width="300px"
            title="Recipe"
          />
        </Container>
        <br />
        <h3 className="recomendations">Recomendações de Drinks</h3>
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
  match: PropTypes.shape(), history: PropTypes.shape() }.isRequired;
