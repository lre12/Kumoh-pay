
import React from 'react';
import Login from './Login';
import WebView from './webview';
import { Route, Switch } from 'react-router-dom';



export default function App() {
    return(
        <Switch>
            <Route exact path="/" component = { Login }/>
            <Route path = '/join' component = { WebView }/>
        </Switch>
    );

  
}