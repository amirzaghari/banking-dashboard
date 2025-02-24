import { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Link } from "react-router-dom";

const Navigation = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Top Navbar */}
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => setOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Banking Dashboard</Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Drawer open={open} onClose={() => setOpen(false)}>
                <List sx={{ width: 250 }}>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/" onClick={() => setOpen(false)}>
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/transactions" onClick={() => setOpen(false)}>
                            <ListItemIcon><ReceiptIcon /></ListItemIcon>
                            <ListItemText primary="Transactions" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default Navigation;
