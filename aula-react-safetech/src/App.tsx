import { ThemeProvider } from '@emotion/react';
import {Router} from './router/Router';
import {themeLight} from './theme/theme';

function App() {
    console.log({themeLight});
    return (
    <ThemeProvider theme={themeLight}>
        <Router/>
    </ThemeProvider>
    );
}

export default App;