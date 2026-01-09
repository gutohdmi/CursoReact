import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { pages } from '../../../../router/pages';
import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { safeApi } from '../../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setNome } from '../../../../store/userSlice';

export function FormSide() {
    const nameInputNome = 'name';
    const nameInputSenha = 'pass';
    const nameInputLembrar = 'remember';

    const [visibilidade, setVisibilidade] = useState(false);
    const [fakeStoreUser, setFakeStoreUser] = useState({ username: '', password: '' });
    const [name, setName] = useState(localStorage.getItem(nameInputNome) || '');
    const [lembrar, setLembrar] = useState(() => {
        const savedLembrar = localStorage.getItem(nameInputLembrar) || 'false';
        const parsedLembrar = JSON.parse(savedLembrar) as boolean;
        return parsedLembrar;
    });

    const nameInputRef = useRef<HTMLInputElement>(null);
    const passInputRef = useRef<HTMLInputElement>(null);
    const lembrarInputRef = useRef<HTMLInputElement>(null);

    const counterRef = useRef<0 | 1>(0);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    function onChangeName(newName: string) {
        setName(newName);
    }

    const [loading, setLoading] = useState(false);

    const handleNameChange = () => {
        dispatch(setNome(name)); 
        setName('');
    };

    const onClickLogin = async () => {
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

        if (lembrarInputRef.current?.checked) {
            handleNameChange();
            localStorage.setItem(nameInputNome, nameInputRef.current.value);
            localStorage.setItem(nameInputLembrar, JSON.stringify(lembrarInputRef.current.checked));
        } else {
            handleNameChange();
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

        try {
            const response = await safeApi.post<{ token: string }>('auth/login', {
                username: nameInputRef.current.value,
                password: passInputRef.current.value,
            });

            const loginResponseToken = response.data.token;

            safeApi.defaults.headers.common.Authorization = `Bearer ${loginResponseToken}`;
            window.localStorage.setItem('auth:token', loginResponseToken);
            console.log(response.data.token);

            navigate(pages.home);
        } catch (error) {
            console.log({ error });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            alert((error as any).response.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(
        () => {
            // alguma coisa vai ocorrer aqui dentro

            if (nameInputRef.current) {
                nameInputRef.current.focus();
            }

            safeApi('users')
                .then(({ data }) => setFakeStoreUser({ username: data[0].username, password: data[0].password }))
                .catch((error) => console.log(error));

            return () => {
                // o que está aqui dentro vai ocorrer no 'unmount' do componente
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
                        label="Nome"
                        name={nameInputNome}
                        value={name}
                        onChange={({ target: { value } }) => onChangeName(value)}
                        inputRef={nameInputRef}
                    />

                    <TextField
                        label="Senha"
                        type={visibilidade ? 'text' : 'password'}
                        name={nameInputSenha}
                        inputRef={passInputRef}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setVisibilidade((c) => !c)}>
                                            {visibilidade ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Button type="button" onClick={onClickLogin} loading={loading}>
                        {'Entrar'}
                    </Button>

                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox checked={lembrar} onChange={() => setLembrar((current) => !current)} />}
                            label="Lembrar de mim"
                            inputRef={lembrarInputRef}
                        />
                    </Box>
                </Box>
                <Typography style={{ textAlign: 'center' }}>
                    Não possui conta? <a href="#">Criar conta</a>
                </Typography>
            </Paper>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" pt={2}>
                <Typography>nome: {fakeStoreUser.username}</Typography>
                <Typography>senha: {fakeStoreUser.password}</Typography>
            </Box>
        </Box>
    );
}