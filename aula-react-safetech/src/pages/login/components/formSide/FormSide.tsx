import {
    useEffect,
    useRef,
    useState,
    // useState
} from 'react';
// import { SafeInput } from '../../../../shared-components/SafeInput';
import { useNavigate } from 'react-router';
import { pages } from '../../../../router/pages';
import { Box, Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material';

export function FormSide() {
    const nameInputNome = 'name';
    const nameInputSenha = 'pass';
    const nameInputLembrar = 'remember';

    const [name, setName] = useState(localStorage.getItem(nameInputNome) || '');
    // const [pass, setPass] = useState<string>('');
    const [lembrar, setLembrar] = useState(() => {
        const savedLembrar = localStorage.getItem(nameInputLembrar) || 'false';
        const parsedLembrar = JSON.parse(savedLembrar) as boolean;
        return parsedLembrar;
    });

    const nameInputRef = useRef<HTMLInputElement>(null);
    const passInputRef = useRef<HTMLInputElement>(null);
    const lembrarInputRef = useRef<HTMLInputElement>(null);

    const counterRef = useRef<0 | 1>(0);
    const timeOutRef = useRef<number>(null);

    const navigate = useNavigate();

    function onChangeName(newName: string) {
        setName(newName);
    }

    // function onChangePass(newPass: string) {
    //     setPass(newPass);
    // }

    // const isNameValid = name.length >= 3;
    // const isPassValid = pass.length >= 3;

    const [loading, setLoading] = useState(false);

    const onClickLogin = () => {
        if (!nameInputRef.current || !passInputRef.current) return;
        // if (counterRef.current > 0) return alert('já está logando');

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

        if (lembrarInputRef.current?.checked) {
            localStorage.setItem(nameInputNome, nameInputRef.current.value);
            localStorage.setItem(nameInputLembrar, JSON.stringify(lembrarInputRef.current.checked));
        } else {
            localStorage.removeItem(nameInputLembrar);
            localStorage.removeItem(nameInputNome);
        }

        console.log({
            name: nameInputRef.current.value,
            pass: passInputRef.current.value,
            lembrar: !!lembrarInputRef.current?.checked,
            counter: counterRef.current,
        });
        counterRef.current = 1;
        timeOutRef.current = setTimeout(() => {
            console.log('usuário está logando');
            setLoading(false);
            // window.location.href = '/home';
            navigate(pages.home);
        }, 2_000);
    };
    // function cancelLogin() {
    //     if (!timeOutRef.current) return;
    //     clearTimeout(timeOutRef.current);
    //     setLoading(false);
    // }

    useEffect(
        () => {
            // alguma coisa vai ocorrer aqui dentro
            // console.log('componente montou');

            if (nameInputRef.current) {
                nameInputRef.current.focus();
            } // setLoading(false);
            return () => {
                // o que está aqui dentro vai ocorrer no 'unmount' do componente
                // console.log('componente DESmontou');
            };
        },
        //  quando algo do array de dependencias abaixo for modificado
        []
    );

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" flex={1}>
            <Paper
                sx={{
                    borderRadius: 2,
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '300px',
                }}
                elevation={8}
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                    <TextField
                        // valid={isNameValid}
                        // labelText="Nome"
                        label="Nome"
                        // labelType="text"
                        // labelPosition="top"
                        name={nameInputNome}
                        // state={name}
                        value={name}
                        onChange={({ target: { value } }) => onChangeName(value)}
                        inputRef={nameInputRef}
                    />

                    <TextField
                        // valid={isPassValid}
                        label="Senha"
                        // labelType="password"
                        type="password"
                        name={nameInputSenha}
                        // state={pass}
                        // onChange={onChangePass}
                        inputRef={passInputRef}
                    />

                    <Button
                        type="button"
                        // disabled={!isNameValid || !isPassValid}
                        // disabled={loading}
                        onClick={onClickLogin}
                        loading={loading}
                    >
                        {'Entrar'}
                    </Button>

                    {/* <SafeInput labelType="checkbox" labelText="Lembrar de mim" labelPosition="right" name={nameInputLembrar} state={remember} /> */}
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <input
                            type="checkbox"
                            name={nameInputLembrar}
                            ref={lembrarInputRef}
                            // checked={lembrar}
                            onChange={() => setLembrar((current) => !current)}
                        /> */}
                        <FormControlLabel
                            control={<Checkbox checked={lembrar} onChange={() => setLembrar((current) => !current)} />}
                            label="Lembrar de mim"
                        />
                        {/* <Typography variant="caption">Lembrar de mim</Typography> */}
                    </Box>
                </Box>
                <Typography style={{ textAlign: 'center' }}>
                    Não possui conta? <a href="#">Criar conta</a>
                </Typography>
            </Paper>
        </Box>
    );
}