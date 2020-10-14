import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch , Redirect } from "react-router-dom"
import { withCookies, useCookies } from 'react-cookie';

import Layout from './Layout';
import Login from './Login';

const App = () => {
  const [cookies, removeCookie] = useCookies(['user']);
  const [hasCookie, setHasCookie] = useState(false);


  return(
    <div>
      {/* {!hasCookie ? <Redirect to="/" /> : <Redirect to="login" />} */}
      <Router>
        <Switch>
          <Route 
            exact path="/login"
            render={routerProps => {
              return (
                  <Login
                      {...routerProps}
                      setHasCookie={setHasCookie}
                  />
              );
          }}
          />
          <Route
            exact path="/"
            render={routerProps => {
              return (
                <div>
                  <Layout
                  {...routerProps}
                  setHasCookie={setHasCookie}
                  removeCookie={() => {
                    removeCookie('user');
                    setHasCookie(false);
                    window.location.reload();
                  }}
                />
                </div>
              );
            }}
          />
        </Switch>
      </Router>      
    </div>
  );
}
export default withCookies(App);