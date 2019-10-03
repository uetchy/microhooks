import 'react-app-polyfill/ie11';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { useDeferredState } from '../.';

const App = (): React.FC => {
  const [query, setQuery] = useDeferredState(1000, '');
  const [value, setValue] = useState('Initial value');

  useEffect(() => {
    setValue(query);
  }, [query]);

  function handleInput(e) {
    setQuery(e.target.value);
  }

  return (
    <Container>
      <h1>useDefferedState</h1>
      <div>Deffered State: {value}</div>
      <Input onChange={handleInput} placeholder="type your word" />
    </Container>
  );
};

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 50px;
`;

const Input = styled.input`
  padding: 10px 20px;
`;

ReactDOM.render(<App />, document.getElementById('root'));
