import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HistoryIcon from '@material-ui/icons/History';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import AssignmentIcon from '@material-ui/icons/Assignment';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export const mainListItems = (
  <div>
    <Link to="/dashboard/home">
      <ListItem>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link to="/dashboard/history">
      <ListItem button>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Histórico"/>
      </ListItem>
    </Link>
    <Link to="/dashboard/services">
      <ListItem button>
        <ListItemIcon>
          <BusinessCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Serviços" />
      </ListItem>
    </Link>
    <Link to="/dashboard/prizes">
      <ListItem button>
        <ListItemIcon>
          <LocalActivityIcon />
        </ListItemIcon>
        <ListItemText primary="Prêmios" />
      </ListItem>
    </Link>
    <Link to="/dashboard/subscription">
      <ListItem button>
        <ListItemIcon>
          <CardMembershipIcon />
        </ListItemIcon>
        <ListItemText primary="Assinatura" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);