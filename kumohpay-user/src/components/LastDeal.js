import React, { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import UserStore from '../stores/UserStore'
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
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const data = [
  {
    id: uuid(),
    ref: '북카페',
    amount: 30000,
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    ref: '도서관',
    amount: 2500,
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    ref: '학식당',
    amount: 6000,
    createdAt: 1554930000000
  },
  {
    id: uuid(),
    ref: '생협',
    amount: 960,
    createdAt: 1554757200000
  }
];

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
  }
}));

const LastDeal = ({id}) => {
  const classes = useStyles();
  const [orders,setOrders] = useState([]);
  const [isReceive, setIsReceive] = useState(false);
  const userStore = useContext(UserStore.context)
  useEffect(() => {
    handleData();
  },[setOrders]);


  const handleData = async () => {
    try {
      const getResponse = await userStore.walletGet("getHistory", id);
      if(await Array.isArray(getResponse.data.result)){
        await setOrders(getResponse.data.result);
      } else {
        await setOrders([]);
      }
      await console.log(getResponse.data.result);
    } catch(e) {

    }

    if(orders !== null) {
      await setIsReceive(true);
    }
  }
  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardHeader title="최근 거래 내역" />
      <Divider />
      <PerfectScrollbar>
        <Box className={classes.box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  사용처
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  금액
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { isReceive === true ? (
          orders.map((order) => (
            <TableRow
              hover
              key={order.id}
            >
              <TableCell>
                {order.ref}
              </TableCell>
              <TableCell>
                {moment(order.createdAt).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>
                {order.amount}
              </TableCell>
            </TableRow>
          ))) : (
          <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
            </TableRow>
          )}
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