import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import VoucherDelete from "./VoucherDelete"
import VoucherAdd from "./VoucherAdd"

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
  pos: {
    marginBottom: 12,
    textAlign: "center"
  },
  button: {
    justifyContent: "center",
  }
});

export default function Voucher() {
  const classes = useStyles();
  const [voucher, setVoucher] = useState(0);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          상품권 보유량
        </Typography>
        <Typography className={classes.charge} variant="h5" component="h2">
          {voucher}원
        </Typography>
      </CardContent>
      <CardActions className={classes.button}>
          <VoucherAdd voucher={voucher} setVoucher={setVoucher}/>
          <VoucherDelete voucher={voucher} setVoucher={setVoucher}/>
      </CardActions>
    </Card>
  );
}
