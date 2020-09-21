
import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';

import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems, homeMainListItems, homeSecondaryListItems } from './listItems';
import { Route, Switch, Link } from 'react-router-dom';
import {useStyles} from './style';
import MainView from './mainView';
import UpdateInfoView from './UpdateInfoView';



export default function WebView() {
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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
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
            <Typography  component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              <Link to="/join" style={{ textDecoration: 'none',  color: 'white'}}>
            금오페이
              </Link>
          </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
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
                <Route path="/join/" exact={true}>
                  <MainView/>
                </Route>
                <Route path="/join/update">
                  <UpdateInfoView/>
                </Route>
              </Switch>
        </Container>
        
      </main>
      </div>

  );
}