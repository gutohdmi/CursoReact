import {
    useEffect,
    useRef, useState,
    // useState
} from 'react';
import { SafeInput } from '../../../../shared-components/SafeInput';

export function FormSide() {
    const nameInputNome = 'name';
    const nameInputSenha = 'pass';
    // const nameInputLembrar = 'remember';

    // const [name, setName] = useState('');
    // const [pass, setPass] = useState<string>('');

    const counterRef= useRef<0|1>(0)
    const timeOutReft = useRef<number>(0)

    const nameInputRef = useRef<HTMLInputElement>(null);
    const passInputRef = useRef<HTMLInputElement>(null);

    // function onChangeName(newName: string) {
    //     setName(newName);
    // }

    // function onChangePass(newPass: string) {
    //     setPass(newPass);
    // }

    // const isNameValid = name.length >= 3;
    // const isPassValid = pass.length >= 3;
    const onPageLoad = () => {
        nameInputRef.current?.focus();
    }

    const [loading,setLoading] = useState<boolean>(false);

    const onClickLogin = () => {
        if (counterRef.current === 1) {alert('Ja tentou login');}
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
        setLoading(true);

        console.log({
            name: nameInputRef.current.value,
            pass: passInputRef.current.value,
            counter: counterRef.current,
        });
        counterRef.current = 1;

        timeOutReft.current = setTimeout(() => {
            console.log(counterRef.current)
            setLoading(false);
        },2_000)
    };

    function cancelLogin(){
        if (timeOutReft.current) return;
        clearTimeout(timeOutReft.current);
        setLoading(true);
    }

    useEffect(
        () => {
            onPageLoad();
            console.log("Componente Montou")
            return () => {
                console.log("Componente Desmontou")
            }
        },
        []
    );

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
                        // state={name}
                        // onChange={onChangeName}
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

                    {/* <SafeInput labelType="checkbox" labelText="Lembrar de mim" labelPosition="right" name={nameInputLembrar} state={remember} /> */}
                </div>
                <p style={{ textAlign: 'center' }}>
                    Não possui conta? <a href="#">Criar conta</a>
                </p>
            </div>
        </div>
    );
}