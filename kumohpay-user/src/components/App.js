import React, { useState, useEffect } from 'react';
import { BrowserRouter,Route, Redirect} from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import Login from './Login';
import Join from './Join';
import WebView from './webview';

function device_check() {
    // 디바이스 종류 설정
    var pc_device = "win16|win32|win64|mac|macintel";
 
    // 접속한 디바이스 환경
    var this_device = navigator.platform;
 
    if ( this_device ) {
 
        if ( pc_device.indexOf(navigator.platform.toLowerCase()) < 0 ) {
            return true
        } else {
            return false
        }
 
    }
}

const App = () => {
    const [cookies, removeCookie] = useCookies(['user']);
    const [hasCookie, setHasCookie] = useState(false);
    useEffect(() => {
        if (cookies.user && cookies.user !== 'undefined') {
            setHasCookie(true);
        }
    }, [cookies]);
    if(!hasCookie){
    // if(!hasCookie&&device_check()){
        return(
            <BrowserRouter>
            <Redirect to="/login" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            
            </BrowserRouter>
            
        )
        
    }
    else{
    // else if(device_check()){
        return(
            <BrowserRouter>
            <Redirect to="/WebView" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            </BrowserRouter>
            
        )
    }
    // else{
    //     return(
    //         <div>
    //             보안상의 이유로 PC로는 접속할 수 없습니다.
    //         </div>
    //     )
    // }
};
export default withCookies(App);