import {
    useRef,
    // useState
} from 'react';
import { SafeInput } from '../../../../shared-components/SafeInput';

export function FormSide() {
    const nameInputNome = 'name';
    const nameInputSenha = 'pass';
    // const nameInputLembrar = 'remember';

    // const [name, setName] = useState('');
    // const [pass, setPass] = useState<string>('');

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

        console.log({
            name: nameInputRef.current.value,
            pass: passInputRef.current.value,
        });
    };

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
                        onClick={onClickLogin}
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