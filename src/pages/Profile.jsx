import React from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEmail, clearStorageAndPushToLogin } from '../services/manageLocalStorage2';

export default function Profile({ history }) {
  return (
    <>
      <Header title="Perfil" />
      <main>
        <h4
          data-testid="profile-email"
        >
          { getEmail() }
        </h4>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => clearStorageAndPushToLogin(history) }
        >
          Sair
        </button>
      </main>
      <Footer />
    </>
  );
}

Profile.propTypes = { history: PropTypes.shape() }.isRequired;
