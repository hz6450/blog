import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';


import Sidebar from './Sidebar';


export default function DateCalendarViews() {
    const defaultTheme = createTheme();
    const [value, onChange] = useState(new Date());
    return (
        <>
            <ThemeProvider theme={defaultTheme} >
                <Box sx={{ display: 'flex' }}>
                    <Sidebar />
                    <CssBaseline />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Grid container spacing={2} columns={{ xs: 2, sm: 3, md: 12 }}>
                            <Grid item xs={5}>
                                <Container maxWidth="lg" sx={{ m: 30 }}>
                                <Calendar onChange={onChange} value={value} />
                                </Container>
                            </Grid>
                            <Grid item xs={4}>
                                <Container maxWidth="lg" sx={{ m: 30 }}>
                                tt
                                </Container>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
}
