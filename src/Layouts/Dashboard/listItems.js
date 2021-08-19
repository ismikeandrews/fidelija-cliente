import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HistoryIcon from '@material-ui/icons/History';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/dashboard/home">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={Link} to="/dashboard/history">
      <ListItemIcon>
        <HistoryIcon />
      </ListItemIcon>
      <ListItemText primary="Histórico"/>
    </ListItem>
    <ListItem button component={Link} to="/dashboard/users">
      <ListItemIcon>
        <PeopleAltIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários"/>
    </ListItem>
    <ListItem button component={Link} to="/dashboard/services">
      <ListItemIcon>
        <BusinessCenterIcon />
      </ListItemIcon>
      <ListItemText primary="Serviços" />
    </ListItem>
    <ListItem button component={Link} to="/dashboard/prizes">
      <ListItemIcon>
        <LocalActivityIcon />
      </ListItemIcon>
      <ListItemText primary="Prêmios" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button component={Link} to="/dashboard/subscription">
      <ListItemIcon>
        <CardMembershipIcon />
      </ListItemIcon>
      <ListItemText primary="Assinatura" />
    </ListItem>
    <ListItem button component={Link} to="/dashboard/wallet">
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primary="Carteira" />
    </ListItem>
  </div>
);