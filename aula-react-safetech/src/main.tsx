import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { safeStore } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={safeStore}>
            <App />
        </Provider>
    </BrowserRouter>
);