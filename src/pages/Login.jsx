import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
// import rockGlass from '../images/rockGlass.svg';
import recipeBook from '../images/recipeBook.png';
import '../App.css';

const initialState = {
  email: '',
  password: '',
};

export default function Login() {
  const [loginState, setLoginState] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);
  useEffect(() => {
    const { email, password } = loginState;
    const regex = /\S+@\S+\.\S+/;
    const min = 6;
    if (regex.test(email) && password.length > min) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [loginState]);

  const submit = () => {
    const { email } = loginState;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setIsRedirect(true);
  };

  return isRedirect ? (
    <Redirect to="/comidas" />
  ) : (
    <div className="meals">
      <span className="logo">All in One Recipes</span>
      {/* <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }> */}
      <img className="recipe-book" src={ recipeBook } alt="Recipe Book" />
      {/* Glass */}
      {/* </object> */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="Enter email"
          data-testid="email-input"
          onChange={
            ({ target: { value } }) => setLoginState({ ...loginState, email: value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="password"
          placeholder="Password"
          data-testid="password-input"
          onChange={
            ({ target: { value } }) => setLoginState({ ...loginState, password: value })
          }
        />
      </Form.Group>
      <Button
        variant={ isDisabled ? 'danger' : 'primary' }
        data-testid="login-submit-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ submit }
      >
        Entrar
      </Button>
    </div>
  );
}
