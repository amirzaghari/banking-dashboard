import { Container, CssBaseline, IconButton, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Navigation from "./Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const theme = useMemo(
        () =>
            createTheme({
                palette: { mode },
            }),
        [mode]
    );

    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="xl">
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <IconButton onClick={toggleTheme} color="inherit">
                        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Box>
                <Navigation />
                <div style={{ marginTop: "20px" }}>{children}</div>
            </Container>
        </ThemeProvider>
    );
};

export default Layout;
