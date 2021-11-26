import React, { useState, createContext, useContext } from 'react'
import { useTheme, createTheme, ThemeProvider  } from '@mui/material/styles';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import BaseLayout from './BaseLayout/BaseLayout';
import Chips from './Components/Chips';
import ComplexitySlider from './Components/ComplexitySlider';
import { amber, deepOrange, grey } from '@mui/material/colors';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {

  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            primary: '#212121',
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: grey[200],
            secondary: grey[400],
          },
        }),
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BaseLayout
        ColorModeContext={ColorModeContext}
        />
       </ThemeProvider>
     </ColorModeContext.Provider>
  );
}

export default App;
