import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import { Home, Post, Write, Login } from './pages';

import { Helmet } from 'react-helmet';

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
        <Helmet>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lobster" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />

          <title>devon.log</title>
          <script defer={true} src="https://use.fontawesome.com/releases/v5.0.6/js/all.js" />
        </Helmet>

        <Header />
        <Container>
          <Route exact={true} path="/" component={Home} />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/write" component={Write} />
            <Route path="/:postId" component={Post} />
          </Switch>
        </Container>
      </RootContainer>
    );
  }
}

export default App;
