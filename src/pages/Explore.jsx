import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  const [redirect, setRedirect] = useState();
  const exploreBtn = (food) => (
    <Button
      variant="outline-dark"
      type="button"
      data-testid={ food ? 'explore-food' : 'explore-drinks' }
      onClick={ () => setRedirect(food ? '/explorar/comidas' : '/explorar/bebidas') }
    >
      {food ? 'Explorar Comidas' : 'Explorar Bebidas'}
    </Button>
  );

  return redirect ? <Redirect to={ redirect } /> : (
    <main className="general-background-color">
      <Header title="Explorar" />
      <Container className="explore-buttons">
        {exploreBtn('food')}
        {exploreBtn()}
      </Container>
      <Footer />
    </main>
  );
}
