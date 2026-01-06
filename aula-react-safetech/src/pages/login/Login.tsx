import { Box, useTheme } from '@mui/material';
import { FormSide } from './components/formSide/FormSide';
import { LogoSide } from './components/logoSide/LogoSide';

export function Login() {
    const {
        palette: { background },
    } = useTheme();

    return (
        <Box style={{ display: 'flex', height: '100%', width: '100%' }} bgcolor={background.default}>
            <LogoSide />
            <FormSide />
        </Box>
    );
}