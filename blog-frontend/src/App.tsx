import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { Home, Post, Write, Login, Logout } from './pages';
import Header from 'src/components/Header';
import { StyledContainer } from 'src/components/Container';
import Footer from 'src/components/Footer';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Noto Sans KR', sans-serif;
`;

const BodyContainer = StyledContainer.extend`
  flex: 1 1 auto;
`;

class App extends React.Component {
  public render() {
    return (
      <RootContainer>
        <Helmet>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lobster" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />

          <title>devon.log</title>
          <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js" />
        </Helmet>

        <Header />
        <BodyContainer>
          <Route exact path="/" component={Home} />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/write" component={Write} />
            <Route path="/:postId(\d+)" component={Post} />
          </Switch>
        </BodyContainer>
        <Footer />
      </RootContainer>
    );
  }
}

export default App;
