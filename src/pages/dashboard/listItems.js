import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LayersIcon from '@mui/icons-material/Layers';
import { Link } from "react-router-dom";


export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/Dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/tictacto">
      <ListItemIcon>
        <VideogameAssetIcon />
      </ListItemIcon>
      <ListItemText primary="games" />
    </ListItemButton>
        <ListItemButton component={Link} to="/Calendar">
      <ListItemIcon>
        <EditCalendarIcon />
      </ListItemIcon>
      <ListItemText primary="Calendar" />
    </ListItemButton>
        <ListItemButton component={Link} to="/Notice">
      <ListItemIcon>
        <ContentPasteIcon />
      </ListItemIcon>
      <ListItemText primary="Notice" />
    </ListItemButton>
        <ListItemButton component={Link} to="/Dashboard">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);
