import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Post, Profile } from './pages';

import Header from './components/Header';

class App extends React.Component {
  public render() {
    return (
      <Fragment>
        <Header />
        <Route exact={true} path="/" component={Home} />
        <Switch>
          <Route path="/:username/:postId" component={Post} />
          <Route path="/:username" component={Profile} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
