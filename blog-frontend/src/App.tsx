import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import {
  Home,
  Post,
  Admin,
  AdminWrite,
  AdminPost,
  Login,
  Logout,
  AdminEdit
} from './pages';
import Header from 'src/components/Header';
import { StyledContainer } from 'src/components/Container';
import Footer from 'src/components/Footer';
import Provider from 'src/contexts/Provider';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Noto Sans KR", sans-serif;
`;

const BodyContainer = StyledContainer.extend`
  flex: 1 1 auto;
`;

class App extends React.Component {
  public render() {
    return (
      <RootContainer>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lobster"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto+Mono"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/earlyaccess/notosanskr.css"
          />

          <title>devon.log</title>
          <script
            defer
            src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"
          />
        </Helmet>

        <Provider>
          <Header />
          <BodyContainer>
            <Route exact path="/" component={Home} />
            <Switch>
              <Route exact path="/admin" component={Admin} />
              <Route path="/admin/write" component={AdminWrite} />
              <Route path="/admin/edit/:postId(\d+)" component={AdminEdit} />
              <Route path="/admin/post" component={AdminPost} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/:postId(\d+)" component={Post} />
            </Switch>
          </BodyContainer>
          <Footer />
        </Provider>
      </RootContainer>
    );
  }
}

export default App;
