import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import {CssBaseline} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery';

// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </ThemeProvider>
  ,
  document.getElementById('root')
);
