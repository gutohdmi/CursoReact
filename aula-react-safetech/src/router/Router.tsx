import { Routes, Route } from 'react-router';
import { pages } from './pages';
import { Login } from '../pages/login/Login';
import Home from '../pages/home/home';

export function Router() {
    return (
        <Routes>
            <Route path={pages.login} Component={Login} />
            <Route path={'*'} Component={Login} />
            <Route path={pages.home} Component={Home} />
        </Routes>
    );
}