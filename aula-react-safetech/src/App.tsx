import { useEffect, useState } from 'react';
import { Home } from './pages/home/home';
import { Login } from './pages/login/Login';

function App() {
    const [page, setPage] = useState(Login);

    useEffect(() => {
        if (window.location.pathname === '/home') setPage(Home);
    });

    return <>{page}</>;
}

export default App;