import SafeInput from "../shared-components/SafeInput";
import bgImage from "../assets/fruitgearaero.jpg";

function Login() {
    return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
        <div
        style={{
            borderWidth: 1,
            borderStyle: 'solid',
            padding: '20px',
            //backgroundColor: ,
            width: '300px',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '10px',
            backgroundColor:'#fff0c3'
        }}>
            <h1>Login</h1>

            <form
                onSubmit={(event,)=>{
                event.preventDefault();
                console.log("Login");
            }}
                style ={{display:'flex', flexDirection:'column',gap: 16, width:'100%'}}
            >
                <SafeInput labelText="Nome" labelType="text" />

                <SafeInput labelText="Senha" labelType="password" />

                <button> Entrar👌 </button>

                <SafeInput labelText={'Lembre de mim'} labelType={'radio'} labelPosition='right'></SafeInput>
                <p>
                    Nao possui conta?
                    <a href='#'>Criar conta</a>
                </p>
            </form>
        </div>
    </div>
    );
}

export default Login