import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router';
import { useState, type MouseEvent } from 'react';
import { pages } from '../router/pages';
import { clearToken } from '../services/api';

export function SafeAppBar() {
    const name = localStorage.getItem('name') || '🤠';
    const navigate = useNavigate();
    const { pathname: currentPage } = useLocation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

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
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                <Typography variant="h6" color="inherit" component="div">
                    Home - Olá {name}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}