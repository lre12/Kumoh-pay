import React, { useState, useEffect } from 'react';
import { BrowserRouter,Route, Switch, Redirect } from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import Login from './Login';
import Join from './Join';
import WebView from './webview';

const App = () => {
    const [cookies, removeCookie] = useCookies(['user']);
    const [hasCookie, setHasCookie] = useState(false);
    useEffect(() => {
        if (cookies.user && cookies.user !== 'undefined') {
            setHasCookie(true);
        }
    }, [cookies]);
    return (
        <div className="App">
            {!hasCookie ? <Redirect to="/login" /> : <Redirect to="/WebView" />}
            <BrowserRouter>
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
                    exact path="/join"
                    component={Join}
                />
                <Route
                    exact path="/WebView"
                    render={routerProps => {
                        return (
                            <WebView
                                {...routerProps}
                                setHasCookie={setHasCookie}
                                removeCookie={() => {
                                    removeCookie('user');
                                    setHasCookie(false);
                                }}
                            />
                        );
                    }}
                />
            </Switch>
            </BrowserRouter>
            
        </div>
    );
};
export default withCookies(App);


