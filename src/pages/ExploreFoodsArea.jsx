import React from 'react';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';
import Footer from '../components/Footer';

export default function ExploreFoodsArea() {
  return (
    <main className="general-background-color">
      <Header title="Explorar Origem" />
      <HeaderSearchButton />
      <Footer />
    </main>
  );
}
