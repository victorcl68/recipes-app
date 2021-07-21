import React from 'react';
import { Container, Image } from 'react-bootstrap';
import cooking from '../images/cooking-load.png';

export default function LoadingImg() {
  return (
    <Container className="general-background-color">
      <br />
      <Image src={ cooking } fluid style={ { width: '200px' } } />
      <h1>Loading...</h1>
    </Container>
  );
}
