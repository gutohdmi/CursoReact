import { FormSide } from './components/formSide/FormSide';
import { LogoSide } from './components/logoSide/LogoSide';

export function Login() {
    // aqui pode usar typescript

    // function onFormSubmit() {
    //     alert('submit');
    // }

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            <LogoSide />
            <FormSide />
        </div>
    );
}