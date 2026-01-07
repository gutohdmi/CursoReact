import { Routes, Route } from 'react-router';
import { pages } from './pages';
import { Login } from '../pages/login/Login';
import { Home } from '../pages/home/home';
import { NotFound } from '../pages/notFound/NotFound';
import { Products } from '../pages/products/Products';

export function Router() {
    return (
        <Routes>
            <Route path={pages.login} Component={Login} />
            <Route path={pages.home} Component={Home} />
            <Route path={pages.products} Component={Products} />
            <Route path={'*'} Component={NotFound} />
        </Routes>
    );
}