import { useNavigate } from "react-router";

export function NotFound() {
    const navigate = useNavigate();
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <h1>Página Não Encontrada (404)</h1>
            </div>
            <button onClick={() => navigate(-1)}>Voltar</button>
        </div>
    );
}