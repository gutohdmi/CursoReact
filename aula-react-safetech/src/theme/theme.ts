import { createTheme } from '@mui/material';

const themeLight = createTheme({
    palette: {
        primary: { main: '#002A45' },
        secondary: { main: '#DB9600' },
        info: { main: '#f57a07dd' },
        success: { main: '#2fd219ff' },
        error: { main: '#ce1e1eff' },
        common: {
            white: '#edededff',
            black: '#101010ff',
        },
        mode: 'light',
    },
});

const themeDark = createTheme({
    palette: {
        primary: { main: '#649fc4ff' },
        secondary: { main: '#DB9600' },
        info: { main: '#f57a07dd' },
        success: { main: '#2fd219ff' },
        error: { main: '#ce1e1eff' },
        common: {
            black: '#edededff',
            white: '#101010ff',
        },
        mode: 'dark',
    },
});

export { themeLight, themeDark };

// Cores da safe:
// #DB9600
// #002A45