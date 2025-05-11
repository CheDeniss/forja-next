'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Oswald, sans-serif',
        allVariants: {
            color: '#E2E2E2',
        }
    },
    palette: {
        mode: 'dark',
        text: {
            primary: '#E2E2E2',
        },
    },
});

export default theme;
