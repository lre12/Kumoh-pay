
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems, homeMainListItems, homeSecondaryListItems } from './listItems';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useStyles } from './style';
import MainView from './mainView';
import UpdateInfoView from './UpdateInfoView';

const WebView = ({ setHasCookie, removeCookie }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [charge, setCharge] = useState(null);
  const [userGroup, setUserGroup] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const getInfoApi = () => {
      return new Promise((resolve, reject) => {
        console.log("signal");
        console.log(signal.aborted);
        fetch('/app/info', {
          signal: signal,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => resolve(res.json()))
          .catch(err => reject(err));
      });
    };
    const onInfoLoad = async () => {
      try {
        const response = await getInfoApi();
        if (response.error === 'token expired') {
          setHasCookie(false);
        } else {
          setId(response[0].id);
          setName(response[0].name);
          setCharge(response[0].charge);
          setUserGroup(response[0].userGroup);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (id == null) {
      onInfoLoad();
    }
    return () => {
      abortController.abort();
    }
  }, [id, name, charge, userGroup, setHasCookie]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  let firstList;
  let secondList;
  if (open) {
    firstList = <List>{mainListItems}</List>
    secondList = <List>{secondaryListItems}</List>
  } else {
    firstList = <List>{homeMainListItems}</List>
    secondList = <List>{homeSecondaryListItems}</List>
  }
  return (

    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              <Link to="/WebView" style={{ textDecoration: 'none', color: 'white' }}>
                금오페이
            </Link>
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={removeCookie}>
              <Badge color="secondary">
                <ExitToAppIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {firstList}
          <Divider />
          {secondList}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route path="/WebView">
                <MainView id={id} name={name} charge={charge} userGroup={userGroup} />
              </Route>
              <Route path="/update">
                <UpdateInfoView setHasCookie = {setHasCookie}/>
              </Route>
            </Switch>
          </Container>


        </main>
      </div>
    </BrowserRouter>
  );
}
export default WebView;