import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Home, Post, Profile } from './pages';

import Header from './components/Header';

class App extends React.Component {
  public render() {
    return (
      <Fragment>
        <Header />
        <Route exact={true} path="/" component={Home} />
        <Route path="/:username" component={Post} />
        <Route path="/:username/:postId" component={Profile} />
      </Fragment>
    );
  }
}

export default App;
