import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans KR", serif',
  },
});

ReactDOM.render(
<MuiThemeProvider theme={theme}>
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>
</MuiThemeProvider>, 
document.getElementById('root'));

serviceWorker.unregister();