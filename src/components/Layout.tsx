import { Container, CssBaseline, IconButton, Toolbar, AppBar, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { Brightness4, Brightness7, Menu as MenuIcon } from "@mui/icons-material";
import Navigation from "./Navigation";
import CurrencySelector from "./CurrencySelector";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<"light" | "dark">("dark");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const theme = useMemo(
        () =>
            createTheme({
                palette: { mode },
            }),
        [mode]
    );

    const toggleTheme = () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Single AppBar for Navbar & Theme Toggle */}
            <AppBar position="fixed">
                <Toolbar>
                    {/* Menu Button for Sidebar */}
                    <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Banking Dashboard
                    </Typography>

                    {/* Currency Selector */}
                    <CurrencySelector />

                    {/* Theme Toggle Button (Now correctly switching icons) */}
                    <IconButton onClick={toggleTheme} color="inherit">
                        {mode === "dark" ? <Brightness4 /> : <Brightness7 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Navigation Sidebar */}
            <Navigation open={drawerOpen} onClose={() => setDrawerOpen(false)} />

            {/* Main Content Wrapper */}
            <Box className={`layout-wrapper ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
                <Box className="layout-overlay" />
                <Container maxWidth="xl" className="layout-content">
                    {children}
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Layout;