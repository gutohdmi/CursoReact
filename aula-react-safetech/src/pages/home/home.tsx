export function Home() {
    const name = localStorage.getItem('login_name') || 'Usuário';
    return (
        <div>
            <h1>Home Page</h1>
            <p>Bem-vindo, {name}!</p>
            <button onClick={() => window.location.href = '/login'}>Logout</button>
        </div>
    );

}
export default Home;