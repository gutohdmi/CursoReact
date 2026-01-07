export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category:
        | 'Eletrônicos'
        | 'Casa & Cozinha'
        | 'Escritório'
        | 'Esportes'
        | 'Moda'
        | 'Brinquedos'
        | 'Automotivo'
        | 'Saúde & Beleza'
        | 'Livros'
        | 'Pet';
    image: string;
};