import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import { Home, Post } from './pages';

import { ApolloProvider } from 'react-apollo';
import Client from './api/Client';

const RootContainer = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
`;

const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

class App extends React.Component {
  public render() {
    return (
      <RootContainer>
        <Header />
        <ApolloProvider client={Client}>
          <Container>
            <Route exact={true} path="/" component={Home} />
            <Switch>
              <Route path="/:postId" component={Post} />
            </Switch>
          </Container>
        </ApolloProvider>
      </RootContainer>
    );
  }
}

export default App;
