import { ThemeProvider } from '@emotion/react';
import {Router} from './router/Router';
import theme from './theme/theme';

function App() {
    console.log({theme});
    return (
    <ThemeProvider theme={theme}>
        <Router/>
    </ThemeProvider>
    );
}

export default App;