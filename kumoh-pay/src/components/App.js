import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Redirect } from "react-router-dom"
import { withCookies, useCookies } from 'react-cookie';
import { get } from 'axios';

import Layout from './Layout';
import Login from './Login';



const App = () => {
  const [cookies, removeCookie] = useCookies(['user']);
  const [hasCookie, setHasCookie] = useState(false);
  const [userId, setUserId] = useState('');
  const [point, setPoint] = useState('');
  useEffect(() => {
    if (cookies.user && cookies.user !== 'undefined') {
        setHasCookie(true);
    }
}, [cookies]);

  if(!hasCookie){
    return(
        <BrowserRouter>
        <Redirect to="/login" />
        <Route
          exact path="/login"
          render={routerProps => {
            return (
              <Login
                {...routerProps}
                setId={setUserId}
                setHasCookie={setHasCookie}
                setPoint={setPoint}
              />
            );
          }}
        />
        </BrowserRouter>
    )
}
else{
    return(
        <BrowserRouter>
        <Redirect to="/home" />
        <Route
          exact path="/home"
          render={routerProps => {
            return (
              <div>
                <Layout
                  {...routerProps}
                  setHasCookie={setHasCookie}
                  userId={userId}
                  point={point}
                  setPoint={setPoint}
                  removeCookie={() => {
                    removeCookie('user');
                    setHasCookie(false);
                  }}
                />
              </div>
            );
          }}
        />
        </BrowserRouter>

    )
}
}
export default withCookies(App);