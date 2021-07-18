import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, InputGroup, FormControl, Container, Row, Col }
  from 'react-bootstrap';
import Context from '../context/Context';

export default function HeaderSearchBar() {
  const {
    requestParams: { chosenFilter, searchText },
    handleChange,
    asyncSetState,
  } = useContext(Context);

  const [blockRequest, setBlockRequest] = useState(false);

  useEffect(() => {
    if (searchText.length > 1 && chosenFilter === 'search.php?f=') {
      setBlockRequest(true);
    } else {
      setBlockRequest(false);
    }
  }, [searchText, chosenFilter]);

  const pesquisar = (
    <Container fluid="sm">
      <InputGroup className="mb-2" htmlFor="search">
        <FormControl
          aria-label="Pesquisar"
          value={ searchText }
          onChange={ handleChange }
          name="searchText"
          id="search"
          type="search"
          data-testid="search-input"
        />
        <Button
          onClick={ blockRequest
            ? () => global.alert('Sua busca deve conter somente 1 (um) caracter')
            : () => asyncSetState() }
          type="button"
          data-testid="exec-search-btn"
        >
          Pesquisar
        </Button>
      </InputGroup>
    </Container>
  );

  const ingrediente = (
    <Col>
      <Form.Check
        label="Ingrediente"
        value="filter.php?i="
        onChange={ handleChange }
        name="chosenFilter"
        required
        id="ingredient"
        type="radio"
        data-testid="ingredient-search-radio"
      />
    </Col>
  );

  const porNome = (
    <Col>
      <Form.Check
        defaultChecked
        label="Nome"
        value="search.php?s="
        onChange={ handleChange }
        name="chosenFilter"
        required
        id="name"
        type="radio"
        data-testid="name-search-radio"
      />
    </Col>
  );

  const porLetra = (
    <Col>
      <Form.Check
        label="Primeira Letra"
        value="search.php?f="
        onChange={ handleChange }
        name="chosenFilter"
        id="first-letter"
        required
        type="radio"
        data-testid="first-letter-search-radio"
      />
    </Col>
  );

  const porLocal = (
    <Col>
      <span>Local: </span>
      <select aria-label="Default select example">
        {/* <option value="1">One</option> */}
      </select>
    </Col>
  );

  return (
    <Form>
      <br />
      {pesquisar}
      <Container>
        <Row>
          {ingrediente}
          {porNome}
          {porLetra}
          {porLocal}
        </Row>
      </Container>
    </Form>
  );
}
