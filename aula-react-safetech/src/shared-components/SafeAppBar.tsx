import { AppBar, Box, Button, FormControlLabel, IconButton, Menu, MenuItem, Switch, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router';
import { useState, type MouseEvent } from 'react';
import { pages } from '../router/pages';
import { clearToken } from '../services/api';
import { SafeModal } from './SafeModal';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setThemeMode } from '../store/configuracoesSlice';

export function SafeAppBar() {
    const name = useAppSelector(({ user }) => user?.user) || '🤠';
    const navigate = useNavigate();
    const { pathname: currentPage } = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const themeMode = useAppSelector(({ configuracoes }) => configuracoes.themeMode);
    const dispatch = useAppDispatch();

    function changeTheme() {
        dispatch(setThemeMode(themeMode === 'light' ? 'dark' : 'light'));
    }

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        clearToken();
        navigate(pages.login);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        list: {
                            'aria-labelledby': 'basic-button',
                        },
                    }}
                >
                    {currentPage !== pages.home && <MenuItem onClick={() => navigate(pages.home)}>Home</MenuItem>}
                    {currentPage !== pages.products && <MenuItem onClick={() => navigate(pages.products)}>Produtos</MenuItem>}
                    <MenuItem onClick={handleOpenModal}>Configurações</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                <Typography variant="h6" color="inherit" component="div">
                    Home - Olá {name}
                </Typography>
            </Toolbar>
            <SafeModal
                isModalOpen={openModal}
                closeModal={handleCloseModal}
                title="Configurações"
                content={
                    <Box display={'flex'} flexDirection={'column'} gap={1}>
                        <Box display={'flex'} alignItems={'flex-end'}>
                            <Typography gutterBottom>Dark</Typography>
                            <FormControlLabel
                                control={<Switch checked={themeMode === 'light'} onChange={changeTheme} color="info" />}
                                label="Modo"
                                labelPlacement="top"
                            />
                            <Typography gutterBottom>Light</Typography>
                        </Box>
                    </Box>
                }
                footer={<Button onClick={handleCloseModal}>Fechar</Button>}
            />
        </AppBar>
    );
}