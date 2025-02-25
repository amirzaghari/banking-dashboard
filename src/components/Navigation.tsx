import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Link } from "react-router-dom";

const Navigation = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    return (
        <Drawer open={open} onClose={onClose}>
            <List sx={{ width: 250 }}>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/" onClick={onClose}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/transactions" onClick={onClose}>
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary="Transactions" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/import-export" onClick={onClose}>
                        <ListItemIcon>
                            <ImportExportIcon /> {/* Updated icon */}
                        </ListItemIcon>
                        <ListItemText primary="Import/Export" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Navigation;