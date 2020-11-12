import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import VoucherDelete from "./VoucherDelete"
import VoucherAdd from "./VoucherAdd"

import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

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

const Voucher = ( { myVoucher } ) => {
  const classes = useStyles();
  const [voucher, setVoucher] = useState(myVoucher);

  return (
    <Card className={classes.card}>
      <CardContent>
      <Grid container spacing={3}>
      <Grid item xs={2}>
      <IconButton
        color="inherit"
        aria-label="close card"
        size="small"
        >
          <RefreshIcon className={classes.icon} style={{ fontSize: 15 }} />
        </IconButton>
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
        >
          <CloseIcon className={classes.icon} style={{ fontSize: 15 }}/>
        </IconButton>
        </Grid>
        </Grid>
        <Typography className={classes.charge} variant="h5" component="h2">
          {myVoucher}원
        </Typography>
      </CardContent>
      <CardActions className={classes.button}>
          <VoucherAdd voucher={voucher} setVoucher={setVoucher}/>
          <VoucherDelete voucher={voucher} setVoucher={setVoucher}/>
      </CardActions>
    </Card>
  );
}
export default Voucher;