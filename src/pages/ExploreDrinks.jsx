/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import renderExporeBtn from '../components/ExploreBtn';
import Context from '../context/Context';

export default function ExploreDrinks() {
  const [redirectTo, setRedirectTo] = useState();
  const { updateEndPoint, randomRecipe } = useContext(Context);

  useEffect(() => {
    updateEndPoint('drinks');
  }, []);

  const handleRedirect = async (url) => {
    if (url === 'rand') {
      setRedirectTo(`/bebidas/${await randomRecipe()}`);
    } else setRedirectTo(`/explorar/bebidas/${url}`);
  };

  return redirectTo ? <Redirect to={ redirectTo } /> : (
    <main className="general-background-color">
      <Header title="Explorar Bebidas" />
      {renderExporeBtn(handleRedirect, 'drinks')}
      <Footer />
    </main>
  );
}
