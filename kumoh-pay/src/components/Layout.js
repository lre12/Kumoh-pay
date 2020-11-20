import React, {Redirect, useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { post } from 'axios';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { menuListItems } from './listItems';
import UserView from './User/UserView';
import CalculateView from './Calculate/CalculateView';
import Voucher from './Voucher/Voucher';

import PresentView from './Present/PresentView';
import { walletGet, walletPost } from './Wallet';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
      marginRight: theme.spacing(2),
  },
  titleApp: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function Layout({ setHasCookie, userId, point, setPoint, removeCookie }) {
  const classes = useStyles();
  const theme = useTheme();
  const [id, setId] = useState(userId);
  const [open, setOpen] = useState(false);



  const logout = () => {
    removeCookie();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if(setHasCookie){
    return (
      <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
              <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
              >
                  <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.titleApp}>
                  <Link to="/home" style={{textDecoration: 'none', color: 'white'}}>
                    금오페이 관리 시스템
                  </Link>
              </Typography>
              <Button onClick={logout} focus="right" color="inherit" href="/login">
                  로그아웃
              </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
            <List>{ menuListItems }</List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Voucher point={point} setPoint={setPoint} userId={id}/>
          <Switch>
            <Route path="/user"><UserView setHasCookie={setHasCookie} userId={id} setPoint={setPoint} /></Route>
            <Route path="/present"><PresentView userId={id} setHasCookie={setHasCookie}/></Route>
            <Route path="/settlement"><CalculateView setHasCookie={setHasCookie} /></Route>
          </Switch>
        </main>
      </div>
      </Router>
    );
  }
  else{
    return <Redirect to='/login' />
  }
}
export default Layout;

