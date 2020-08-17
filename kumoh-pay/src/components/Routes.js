import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SellerApp from './SellerApp';

export default () => (
    <Router>
      <Route path="/seller" component={SellerApp} />
    </Router>
  )