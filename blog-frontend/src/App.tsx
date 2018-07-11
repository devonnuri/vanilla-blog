import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import { Home, Post } from './pages';

const Container = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
`;

class App extends React.Component {
  public render() {
    return (
      <Container>
        <Header />
        <Route exact={true} path="/" component={Home} />
        <Switch>
          <Route path="/:postId" component={Post} />
        </Switch>
      </Container>
    );
  }
}

export default App;
