import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import {createTheme, ThemeProvider} from '@mui/material/styles';

const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

const theme = createTheme({
  palette: {
    mode: darkTheme ? 'dark' : 'light'
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
