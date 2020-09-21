import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './src/components/Login';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="/login" component={MainView} />
  </Route>
);