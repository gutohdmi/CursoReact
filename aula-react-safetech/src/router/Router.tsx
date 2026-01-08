import { Routes, Route, Outlet, Navigate } from 'react-router';
import { pages } from './pages';
import { Login } from '../pages/login/Login';
import { Home } from '../pages/home/home';
import { NotFound } from '../pages/notFound/NotFound';
import { Products } from '../pages/products/Products';
import { safeApi } from '../services/api';

function isAuthenticated(): boolean {
    const token = localStorage.getItem('auth:token');
    if (!token) return false;
    safeApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    return true;
}

function PublicLayer() {
    return isAuthenticated() ? <Navigate to={pages.home} replace /> : <Outlet />;
}

function PrivateLayer() {
    return isAuthenticated() ? <Outlet /> : <Navigate to={pages.login} replace />;
}

export function Router() {
    return (
        <Routes>
            {/* Camada pública */}
            <Route element={<PublicLayer />}>
                <Route path={pages.login} Component={Login} />
            </Route>

            {/* Camada privada */}
            <Route element={<PrivateLayer />}>
                <Route path={pages.home} Component={Home} />
                <Route path={pages.products} Component={Products} />
                <Route path={'*'} Component={NotFound} />
            </Route>
        </Routes>
    );
}