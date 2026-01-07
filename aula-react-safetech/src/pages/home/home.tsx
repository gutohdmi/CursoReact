import productList from '../../mocks/product/products_1000.json';
import { Box, Button, Menu, MenuItem, Paper } from '@mui/material';
import { useState, type MouseEvent } from 'react';
import { SafeCard } from './components/ProductCard';
import type { Product } from '../../mocks/product/product';
import { SafeAppBar } from '../../shared-components/SafeAppBar';

export function Home() {
    const [anchorElSorting, setAnchorElSorting] = useState<null | HTMLElement>(null);
    const openSorting = Boolean(anchorElSorting);

    const handleClickSorting = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElSorting(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElSorting(null);
    };

    const [filter, setFilter] = useState<'price' | 'title'>('price');
    return (
        <Box display={'flex'} flexDirection={'column'} height={'100%'}>
            <SafeAppBar />
            <Box display={'flex'} gap={2} padding={2} flex={1}>
                <Paper sx={{ width: '200px', display: 'flex', flexDirection: 'column', p: 1 }} elevation={3}>
                    <Button onClick={handleClickSorting}>Sorting</Button>
                    <Menu
                        anchorEl={anchorElSorting}
                        open={openSorting}
                        onClose={handleClose}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'basic-button',
                            },
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                setFilter('price');
                                handleClose();
                            }}
                            selected={filter === 'price'}
                        >
                            Preço
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setFilter('title');
                                handleClose();
                            }}
                            selected={filter === 'title'}
                        >
                            Nome
                        </MenuItem>
                    </Menu>
                </Paper>
                <Paper sx={{ flex: 1, display: 'flex', p: 1, flexWrap: 'wrap', gap: 1 }} elevation={3}>
                    {productList
                        .sort((a, b) => {
                            const av = a[filter];
                            const bv = b[filter];

                            if (typeof av === 'number' && typeof bv === 'number') {
                                return av - bv;
                            }

                            // trata como string (ex: title)
                            return String(av).localeCompare(String(bv), 'pt-BR', { sensitivity: 'base' });
                        })
                        .filter((p, i) => i <= 20)
                        .map((p) => (
                            <SafeCard {...(p as Product)} key={p.id} />
                        ))}
                </Paper>
            </Box>
        </Box>
    );
}