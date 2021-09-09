import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import DashboardIcon from '@material-ui/icons/Dashboard'
import HistoryIcon from '@material-ui/icons/History'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import CardMembershipIcon from '@material-ui/icons/CardMembership'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import { 
  CssBaseline, 
  Collapse,
  Drawer, 
  AppBar, 
  Button,
  Toolbar, 
  List, 
  ListItem,
  Typography, 
  Divider, 
  IconButton, 
  Badge, 
  Container, 
  Avatar, 
  Menu, 
  MenuItem,
  ListItemText, 
  ListSubheader,
  Grid,
  ListItemIcon,
  withStyles
} from '@material-ui/core'

import { useSnackbar } from 'notistack';

import { onMessageListener } from '../../firebase';

import { useStyles } from './DashboardElements'
import { authService, userService } from '../../services';

export default function Dashboard(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [openNest, setOpenNest] = useState(false);
  const [openUserNest, setOpenUserNest] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userObj, setUserObj] = useState({});
  const [notMenu, setNotMenu] = useState(null)
  const [notificationList, setNotificationList] = useState([])

  const { enqueueSnackbar } = useSnackbar();

  
  onMessageListener().then(async (payload) => {
    if(payload.data.silent === "false"){
      await fetchUser()
      isNewNotification(payload.notification.title)
      new Notification(payload.notification.title);
    } else if(payload.data.silent === 'true'){
      console.log("notificação silenciosa")
    }
  }).catch(err => console.log('failed: ', err));
  
  useEffect(() => {
    fetchUser()
  }, [])
  
  const isNewNotification = (title) => {
    enqueueSnackbar(title, {variant: 'info'});
  };

  const fetchUser = async () => {
    setUserObj(authService.getLoggedUser())
    try {
      const res = await userService.notificationList(1, 20);
      setNotificationList(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotOpen = (event) => {
    setNotMenu(event.currentTarget)
  }

  const handleNotClose = () => {
    setNotMenu(null);
  }

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenNest(false)
    setOpenUserNest(false)
  };

  const handleLogout = () => {
      const res = authService.clearLoggedUser()
      if(res){
        window.location.reload();
      }else {
        alert("Error")
      }
  }

  const markAllAsRead = async () => {
    try {
      await userService.notificationMarkAllRead();
      fetchUser()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {userObj.stablishment?.name}
          </Typography>
          <IconButton color="inherit" onClick={handleNotOpen} style={{marginRight: '10px'}} >
            <Badge badgeContent={notificationList.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            open={Boolean(notMenu)}
            onClose={handleNotClose}
            PaperProps={{
              style: {
                maxHeight: '300px',
                width: '60ch',
              },
            }}>
            
            {notificationList.length > 0 ? (
              <List>
                <ListSubheader style={{background: 'white', textAlign: 'center'}}>
                  <Grid container>
                    <Grid item xs={5}>
                      <Button color="primary" onClick={() => markAllAsRead()}>Marcar como lidas</Button>
                    </Grid>
                    <Grid item xs={7}>
                      <Button color="primary" component={Link} to="/dashboard/notifications" onClick={() => setNotMenu(false)}>Minhas notificações</Button>
                    </Grid>
                  </Grid>
                </ListSubheader>
                {notificationList.map(notification => (
                  <div key={notification.id}>
                    <ListItem button alignItems="center">
                      <ListItemText
                        primary={notification.title}
                        secondary={notification.message}/>
                        {notification.read === 0 && (
                          <Badge color="primary" overlap="circle" variant="dot" style={{marginRight: '45px', zIndex: '0'}}></Badge>
                        )}
                    </ListItem>
                    <Divider/>
                  </div>
                ))}
              </List>  
            ) : (
              <div>
                Nem uma notificação
              </div>
            )}
          </Menu>
          
          <Badge
          overlap="circle"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
          badgeContent={<Avatar className={classes.smallAvatar} alt={userObj.name} src={process.env.REACT_APP_BASE_URL +  userObj.photo} />}
          style={{cursor: 'pointer'}}
          onClick={handleClick}>
            <Avatar className={classes.largeAvatar} alt={userObj.stablishment?.name} src={process.env.REACT_APP_BASE_URL + 'imgs/' + userObj.stablishment?.photo}/>
          </Badge>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
                <MenuItem component={Link} to="/dashboard/profile" onClick={handleClose}>Minha conta</MenuItem>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/dashboard/home">
            <ListItemIcon>
              <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/history">
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Histórico"/>
          </ListItem>

          <ListItem button onClick={() => {setOpenUserNest(!openUserNest); setOpen(true)}}>
            <ListItemIcon>
              <PeopleAltIcon/>
            </ListItemIcon>
            <ListItemText primary="Usuários"/>
            {openUserNest ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openUserNest} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} component={Link} to="/dashboard/users">
                <ListItemText primary="Clientes" />
              </ListItem>
              <ListItem button className={classes.nested} component={Link} to="/dashboard/employee">
                <ListItemText primary="Funcionarios" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button component={Link} to="/dashboard/services" disabled>
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary="Serviços" />
          </ListItem>

          <ListItem button onClick={() => {setOpenNest(!openNest); setOpen(true);}}>
            <ListItemIcon>
              <ShoppingCartOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Produtos" />
            {openNest ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openNest} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} component={Link} to="/dashboard/prizes">
                <ListItemText primary="Lista" />
              </ListItem>
              <ListItem button className={classes.nested} component={Link} to="/dashboard/create-prize">
                <ListItemText primary="Novo Produto" />
              </ListItem>
            </List>
          </Collapse>

        </List>
        <Divider />
        <List>
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
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          {props.children}
        </Container>
      </main>
    </div>
  );
}

