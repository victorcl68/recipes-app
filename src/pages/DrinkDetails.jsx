import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card, CardColumns, CardGroup, Container, ListGroup }
  from 'react-bootstrap';
import Context from '../context/Context';
import DecentFooter from '../components/DecentFooter';
import shareIcon from '../images/shareIcon.svg';
import { localStorageVerifier,
  verifyFavorite, settingFavorite } from '../services/manageLocalStorage';
import { copyLink } from '../services/functions';

export default function DrinkDetails({ match, match: { params: { id } }, history }) {
  const [isCopied, setIsCopied] = useState(false);
  const [count, setCount] = useState(0);
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
    const { ingredient, measure } = generateIngredientsAndMeasure(details.drinks[0]);
    const drinksArray = Object.keys(ingredient);
    return (
      drinksArray.map((_a, index) => (
        <ListGroup key={ `ingredientAndMeasure${index + 1}` }>
          <ListGroup.Item data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient[`strIngredient${index + 1}`]}
            - ${measure[`strMeasure${index + 1}`]}`}
          </ListGroup.Item>
        </ListGroup>
      ))
    );
  }

  const handleCount = (x) => {
    const four = 4;
    if (count === 0 && x === 'less') {
      return setCount(four);
    } if (count === four && x === 'more') {
      return setCount(0);
    } return x === 'more' ? setCount(count + 2) : setCount(count - 2);
  };

  const loopRecomendationsFoods = () => {
    const recommendationsNumber = 6;
    const slicedRecommendations = meals.slice(0, recommendationsNumber);
    return (
      <Container>
        <Button
          variant="info"
          className="button-carousel"
          type="button"
          onClick={ () => handleCount('less') }
        >
          {'<'}
        </Button>
        <Button
          variant="info"
          className="button-carousel"
          type="button"
          onClick={ () => handleCount('more') }
        >
          {'>'}
        </Button>
        <CardGroup className="d-flex justify-content-center">
          {slicedRecommendations.map((meal, index) => (
            <Card
              key={ index }
              hidden={ !(index === count || index === count + 1) }
              data-testid={ `${index}-recomendation-card` }
            >
              <Card.Img
                variant="top"
                src={ meal.strMealThumb }
                alt="recommendation meal"
              />
              <Card.Body>
                <Card.Title data-testid={ `${index}-recomendation-title` }>
                  {meal.strMeal}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
      </Container>
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
      <main className="general-background-color">
        <CardColumns className="d-flex justify-content-center">
          <Card style={ { width: '24rem' } }>
            <Card.Img
              variant="top"
              src={ strDrinkThumb }
              alt="Drink"
              width="200px"
              data-testid="recipe-photo"
            />
            <Card.Body>
              <Card.Title data-testid="recipe-title">
                {`Name: ${strDrink}`}
              </Card.Title>
              <Card.Text className="category" data-testid="recipe-category">
                {`Category: ${strAlcoholic}`}
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
          <h3>Ingredientes:</h3>
          {loopIngredientsAndMeasure()}
          <br />
          <h3>Instrução:</h3>
          <div className="instructions" data-testid="instructions">
            {strInstructions}
          </div>
        </Container>
        <br />
        <h3 className="recomendations">Recomendações de Comidas</h3>
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
