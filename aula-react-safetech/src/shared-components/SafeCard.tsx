import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import type { Product } from '../mocks/product/product';
import { pages } from '../router/pages';
import { useNavigate } from 'react-router';

export function SafeCard({ category, description, image, price, title, id }: Product) {
    const { shadows } = useTheme();
    const navigate = useNavigate();

    return (
        <Card
            sx={{ width: 280, my: 1, ':hover': { boxShadow: shadows[4] }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            elevation={0}
        >
            <CardMedia sx={{ height: 140, backgroundSize: 'contain' }} image={image} title={title} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
                <Typography variant="body1" mt={1}>
                    Categoria: {category}
                </Typography>
                <Typography variant="body1" mt={1}>
                    Valor: {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Typography>
            </CardContent>
            <CardActions>
                <Button fullWidth onClick={() => navigate(pages.products + '/' + id)}>Comprar</Button>
            </CardActions>
        </Card>
    );
}