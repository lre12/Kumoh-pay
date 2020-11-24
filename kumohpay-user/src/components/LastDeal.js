import React, { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import UserStore from '../stores/UserStore'
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
  },
  actions: {
    justifyContent: 'flex-end'
  },
  box: {
    "@media (min-device-width: 481px)": { // PC
      fontSize: '2rem',
      minWidth : 600
    },
    "@media (min-device-width: 320px) and (max-device-width: 480px)": { // Mobile
      fontSize: '1.5rem',
      minWidth : 250
    },
  },
  dealInfo: {

  },
  dealAmount: {

  }
}));


const LastDeal = ({id , orders,setOrders}) => {
  const classes = useStyles();
  const userStore = useContext(UserStore.context)

  const stateRefresh = async () => {
    const history = await userStore.walletGet("getHistory", id);
    console.log(history);
    if(Array.isArray(history.data.result)){
      await setOrders(history.data.result);
      console.log(history.data.result)
    } else {
      await setOrders([]);
    }
  };

  return (
    <Card
      className={clsx(classes.root)}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <CardHeader title="최근 거래 내역" />
        <Grid contianer direction="row" justify="flex-end" alignItems="center">
        <IconButton
        color="inherit"
        aria-label="close card"
        size="small"
        onClick={stateRefresh}
        >
          <RefreshIcon className={classes.icon}  color="textSecondary" />
        </IconButton>
        &nbsp;&nbsp;&nbsp;&nbsp;
        </Grid>
      </Grid>
      <Divider />
      <PerfectScrollbar>
        <Box className={classes.box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      ID
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  금액
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { orders.map((order) => {
              return (
              order.receiver === id ?
                <TableRow hover>
              <TableCell>
                <Typography variant="caption" display="block" color="textSecondary" gutterBottom>
                {moment(order.date).format('DD/MM/YYYY')}
                </Typography>
                <Divider />
                <Typography variant="h6" gutterBottom>
                {order.sender}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="caption" display="block" color="primary" gutterBottom>
                입금
                </Typography>
                <Divider />
                <Typography variant="h6" color="error" gutterBottom>
                {order.amount} 원
                </Typography>
              </TableCell>
            </TableRow>
              :
                <TableRow hover>
              <TableCell>
                <Typography variant="caption" display="block" color="textSecondary" gutterBottom>
                {moment(order.date).format('DD/MM/YYYY')}
                </Typography>
                <Divider />
                <Typography variant="h6" gutterBottom>
                {order.receiver}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="caption" display="block" color="error" gutterBottom>
                출금
                </Typography>
                <Divider />
                <Typography variant="h6" color="primary" gutterBottom>
                {order.amount} 원
                </Typography>
              </TableCell>
              </TableRow>
              )
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LastDeal.propTypes = {
  className: PropTypes.string
};

export default LastDeal;