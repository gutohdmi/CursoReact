import { Box, FormControlLabel, Switch, ThemeProvider, Typography, useTheme } from '@mui/material';
import { Router } from './router/Router';
import { themeLight, themeDark } from './theme/theme';
import { useState } from 'react';

function App() {
    const [themeMode, setThemeMode] = useState(themeLight);
    const { palette } = useTheme();
    return (
        <ThemeProvider theme={themeMode}>
            <Router />
            <Box position="absolute" right={16} top={4} display="flex" alignItems="flex-end">
                <Typography color={palette.primary.contrastText} gutterBottom>
                    Dark
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={themeMode.palette.mode === 'light'}
                            onChange={(e) => setThemeMode(e.target.checked ? themeLight : themeDark)}
                            color="info"
                        />
                    }
                    label="Modo"
                    labelPlacement="top"
                    slotProps={{ typography: { color: palette.primary.contrastText } }}
                />
                <Typography color={palette.primary.contrastText} gutterBottom>
                    Light
                </Typography>
            </Box>
        </ThemeProvider>
    );
}

export default App;