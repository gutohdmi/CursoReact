import {
    useEffect,
    useRef, useState,
    // useState
} from 'react';
import { SafeInput } from '../../../../shared-components/SafeInput';

export function FormSide() {
    const nameInputNome = 'name';
    const nameInputSenha = 'pass';
    const nameInputCheck = 'check';

    const counterRef= useRef<0|1>(0)
    const timeOutReft = useRef<number>(0)

    const nameInputRef = useRef<HTMLInputElement>(null);
    const passInputRef = useRef<HTMLInputElement>(null);
    const checkInputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState(localStorage.getItem('login_name') || '');
    const [remember, setRemember] = useState(localStorage.getItem('login_remember') === 'true');

    const [loading,setLoading] = useState<boolean>(false);

    function onChangeName(newName: string) {
        setName(newName);
    }
    const onClickLogin = () => {
        if (!nameInputRef.current || !passInputRef.current) return;

        if (nameInputRef.current.value.length <= 3) {
            alert('nome muito curto');
            nameInputRef.current.focus();
            return;
        }

        if (passInputRef.current.value.length <= 3) {
            alert('senha muito curta');
            passInputRef.current.focus();
            return;
        }

        if (remember) {
            localStorage.setItem('login_name', nameInputRef.current!.value);
            localStorage.setItem('login_remember', 'true');
        } else {
            localStorage.removeItem('login_name');
            localStorage.removeItem('login_remember');
        }
        console.log('Logando com', {
            name: nameInputRef.current.value,
            pass: passInputRef.current.value,
            remember: checkInputRef.current?.checked,
        });

        setLoading(true);
        counterRef.current = 1;

        timeOutReft.current = window.setTimeout(() => {
            setLoading(false);
        }, 2000);
    };


    function cancelLogin(){
        if (timeOutReft.current) return;
        clearTimeout(timeOutReft.current);
        setLoading(true);
    }


    useEffect(() => {
        },
        []);


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                flex: 1,
            }}
        >
            <div
                style={{
                    border: '1px solid navy',
                    backgroundColor: 'lightblue',
                    borderRadius: 16,
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 300,
                }}
            >
                <h1>Login</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
                    <SafeInput
                        // valid={isNameValid}
                        labelText="Nome"
                        labelType="text"
                        labelPosition="top"
                        name={nameInputNome}
                        state={name}
                        onChange={onChangeName}
                        inputRef={nameInputRef}
                    />

                    <SafeInput
                        // valid={isPassValid}
                        labelText="Senha"
                        labelType="password"
                        name={nameInputSenha}
                        // state={pass}
                        // onChange={onChangePass}
                        inputRef={passInputRef}
                    />

                    <button
                        type="button"
                        // disabled={!isNameValid || !isPassValid}
                        onClick={loading?cancelLogin:onClickLogin}
                    >
                        Entrar
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <input
                            type="checkbox"
                            name={nameInputCheck}
                            ref={checkInputRef}
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label htmlFor={nameInputCheck}>Lembrar de mim</label>
                    </div>


                    {/* <SafeInput labelType="checkbox" labelText="Lembrar de mim" labelPosition="right" name={nameInputLembrar} state={remember} /> */}
                </div>
                <p style={{ textAlign: 'center' }}>
                    Não possui conta? <a href="#">Criar conta</a>
                </p>
            </div>
        </div>
    );
}