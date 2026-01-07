import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { safeApi } from '../../../../services/api';

export function FormSide() {
const nameInputNome = 'name';
const nameInputSenha = 'pass';
const nameInputLembrar = 'remember';

const [visibilidade, setVisibilidade] = useState(false);
    const [fakeStoreUser, setFakeStoreUser] = useState({ username: '', password: '' });
const [name, setName] = useState(localStorage.getItem(nameInputNome) || '');
const [lembrar, setLembrar] = useState(() => {
const savedLembrar = localStorage.getItem(nameInputLembrar) || 'false';
@@ -23,7 +25,6 @@ export function FormSide() {
const lembrarInputRef = useRef<HTMLInputElement>(null);

const counterRef = useRef<0 | 1>(0);
    const timeOutRef = useRef<number>(null);

const navigate = useNavigate();

@@ -33,7 +34,7 @@ export function FormSide() {

const [loading, setLoading] = useState(false);

    const onClickLogin = () => {
    const onClickLogin = async () => {
if (!nameInputRef.current || !passInputRef.current) return;

if (nameInputRef.current.value.length <= 3) {
@@ -63,11 +64,25 @@ export function FormSide() {
counter: counterRef.current,
});
counterRef.current = 1;
        timeOutRef.current = setTimeout(() => {
            console.log('usuário está logando');
            setLoading(false);
        // timeOutRef.current = setTimeout(() => {
        //     console.log('usuário está logando');
        //     setLoading(false);
        //     navigate(pages.home);
        // }, 2_000);

        try {
            await safeApi.post('auth/login', {
                username: nameInputRef.current.value,
                password: passInputRef.current.value,
            });
navigate(pages.home);
        }, 2_000);
        } catch (error) {
            console.log({ error });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            alert((error as any).response.data);
        } finally {
            setLoading(false);
        }
};

useEffect(
@@ -77,6 +92,11 @@ export function FormSide() {
if (nameInputRef.current) {
nameInputRef.current.focus();
}

            safeApi('users')
                .then(({ data }) => setFakeStoreUser({ username: data[0].username, password: data[0].password }))
                .catch((error) => console.log(error));

return () => {
// o que está aqui dentro vai ocorrer no 'unmount' do componente
};
@@ -145,6 +165,10 @@ export function FormSide() {
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