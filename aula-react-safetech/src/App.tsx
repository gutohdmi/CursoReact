import { ThemeProvider } from '@mui/material';
import { Router } from './router/Router';
import { themeLight } from './theme/theme';
import { useState } from 'react';

function App() {
    const [themeMode, setThemeMode] = useState(themeLight);
    return (
        <ThemeProvider theme={themeMode}>
            <Router setThemeMode={setThemeMode} themeMode={themeMode} />
        </ThemeProvider>
    );
}

export default App;