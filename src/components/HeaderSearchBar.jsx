import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, FormControl }
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

  // const porLocal = (
  //   <Col>
  //     <span>Local: </span>
  //     <select aria-label="Default select example">
  //       {/* <option value="1">One</option> */}
  //     </select>
  //   </Col>
  // );

  return (
    <Form className="d-flex">
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
      <FormControl
        name="searchText"
        data-testid="search-input"
        id="search"
        type="search"
        value={ searchText }
        onChange={ handleChange }
        placeholder="Search"
        className="mr-2"
        aria-label="Pesquisar"
      />
      <Button
        onClick={ blockRequest
          ? () => global.alert('Sua busca deve conter somente 1 (um) caracter')
          : () => asyncSetState() }
        data-testid="exec-search-btn"
      >
        Pesquisar
      </Button>
    </Form>
  );
}
