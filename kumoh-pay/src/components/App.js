import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Switch , Redirect } from "react-router-dom"
import { withCookies, useCookies } from 'react-cookie';

import Layout from './Layout';
import Login from './Login';

const App = () => {
  const [cookies, removeCookie] = useCookies(['user']);
  const [hasCookie, setHasCookie] = useState(false);
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
                            setHasCookie={setHasCookie}
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