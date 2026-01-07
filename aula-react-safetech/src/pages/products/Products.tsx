import { Box, CircularProgress, Paper } from '@mui/material';
import { SafeAppBar } from '../../shared-components/SafeAppBar';
import type { Product } from '../../mocks/product/product';
import { useEffect, useState } from 'react';
import { SafeCard } from '../../shared-components/SafeCard';
import { type AxiosResponse } from 'axios';
import { safeApi } from '../../services/api';

export function Products() {
    const [produtos, setProdutos] = useState<Array<Product> | Product[]>([]);
    const [loading, setLoading] = useState(true);

    async function buscarProdutos() {
        try {
            const { data }: AxiosResponse<Product[]> = await safeApi.get('products');
            console.log(data);
            setProdutos(data);
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, []);

    return (
        <Box display={'flex'} flexDirection={'column'} height={'100%'}>
            <SafeAppBar />
            <Box display={'flex'} gap={2} padding={2} flex={1}>
                <Paper sx={{ flex: 1, display: 'flex', p: 1, flexWrap: 'wrap', gap: 1 }} elevation={3}>
                    {!loading ? (
                        produtos.map((produto) => <SafeCard {...produto} key={produto.id} />)
                    ) : (
                        <Box display={'flex'} flex={1} justifyContent={'center'} alignItems={'center'}>
                            <CircularProgress />
                        </Box>
                    )}
                </Paper>
            </Box>
        </Box>
    );
}