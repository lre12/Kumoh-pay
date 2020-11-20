import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import VoucherDelete from "./VoucherDelete"
import VoucherAdd from "./VoucherAdd"

import Grid from '@material-ui/core/Grid';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import {walletGet} from '../Wallet';

const useStyles = makeStyles({
  card: {
    position: "absolute",
    fontStyle: "bold",
    minWidth: 240,
    maxWidth: 240,
  },
  bullet: {
    margin: "0 2px"
  },
  title: {
    fontSize: 14,
    textAlign: "center"
  },
  charge: {
    fontSize: 24,
    textAlign: "center"
  },
  button: {
    justifyContent: "center",
  },
});

const Voucher = ( { point, setPoint, userId } ) => {
  const classes = useStyles();

  useEffect (() => {

  }, [setPoint])

  const stateRefresh = async () => {
    const getResponse = await walletGet("queryPoint", userId);
    console.log(getResponse);
    await setPoint(getResponse.data.result.Amount);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
      <Grid container spacing={3}>
      <Grid item xs={2}>

      </Grid>
        <Grid item xs={8}>
        <Typography className={classes.title} gutterBottom>
          상품권 보유량
        </Typography>

        </Grid>
        <Grid item xs={2}>
        <IconButton
        color="inherit"
        aria-label="close card"
        size="small"
        onClick={stateRefresh}
        >
          <RefreshIcon className={classes.icon} style={{ fontSize: 15 }} />
        </IconButton>
        </Grid>
        </Grid>
        <Typography className={classes.charge} variant="h5" component="h2">
          {point}원
        </Typography>
      </CardContent>
      <CardActions className={classes.button}>
          <VoucherAdd userId={userId} setPoint={setPoint}/>
          <VoucherDelete userId={userId} setPoint={setPoint}/>
      </CardActions>
    </Card>
  );
}
export default Voucher;