import type { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InicialState = {
    themeMode: PaletteMode;
};

const initialState: InicialState = {
    themeMode: 'light',
};


export const configuracoesSlice = createSlice({
    name: 'cofiguracoes',
    initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<PaletteMode>) => {
            state.themeMode = action.payload;
        },
    },
});

export const { setThemeMode } = configuracoesSlice.actions;

export default configuracoesSlice.reducer;