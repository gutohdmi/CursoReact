import { Routes, Route, Outlet, Navigate } from 'react-router';
import { pages } from './pages';
import { Login } from '../pages/login/Login';
import { Home } from '../pages/home/home';
import { NotFound } from '../pages/notFound/NotFound';
import { Products } from '../pages/products/Products';
import { safeApi } from '../services/api';
import { ProductDetail } from '../pages/productDetail/ProductDetail';
import { SafeAppBar } from '../shared-components/SafeAppBar';
import type { Theme } from '@mui/material';

type Props = {
    setThemeMode: React.Dispatch<React.SetStateAction<Theme>>;
    themeMode: Theme;
};

function isAuthenticated(): boolean {
    const token = localStorage.getItem('auth:token');
    if (!token) return false;
    safeApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    return true;
}

function PublicLayer() {
    return isAuthenticated() ? <Navigate to={pages.home} replace /> : <Outlet />;
}

function PrivateLayer({ setThemeMode, themeMode }: Props) {
    return isAuthenticated() ? (
        <>
            <SafeAppBar setThemeMode={setThemeMode} themeMode={themeMode} />
            <Outlet />
        </>
    ) : (
        <Navigate to={pages.login} replace />
    );
}

export function Router({ setThemeMode, themeMode }: Props) {
    return (
        <Routes>
            {/* Camada pública */}
            <Route element={<PublicLayer />}>
                <Route path={pages.login} Component={Login} />
            </Route>

            {/* Camada privada */}
            <Route element={<PrivateLayer setThemeMode={setThemeMode} themeMode={themeMode} />}>
                <Route path={pages.home} Component={Home} />
                <Route path={pages.products} Component={Products} />
                <Route path={pages.products + '/:id'} Component={ProductDetail} />
                <Route path={'*'} Component={NotFound} />
            </Route>
        </Routes>
    );
}