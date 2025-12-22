import { useState } from 'react';
import { FormSide } from './components/formSide/FormSide';
import { LogoSide } from './components/logoSide/LogoSide';

export function Login() {
    // aqui pode usar typescript

    // function onFormSubmit() {
    //     alert('submit');
    // }

    const [name, setName] = useState('');
    const [pass, setPass] = useState<string>('');

    function onChangeName(newName: string) {
        setName(newName);
    }

    function onChangePass(newPass: string) {
        setPass(newPass);
    }

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            <LogoSide />
            <FormSide nome={name} onChangeNome={onChangeName} pass={pass} onChangePass={onChangePass} />
        </div>
    );
}

export default Login;