import React, { useState, useEffect, useContext } from 'react';
import QRCode from 'qrcode.react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import UserStore from '../stores/UserStore'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  button: {
    backgroundColor: '#E6E6E6',
  },
}));

const GetVoucherView = ({ setHasCookie, removeCookie }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [charge, setCharge] = useState(null);
  const [userGroup, setUserGroup] = useState(null);
  const userStore = useContext(UserStore.context)
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const onInfoLoad = async () => {
      try {
        const response = await userStore.getInfoApi(signal);
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

  const bull = <span className={classes.bullet}>•</span>;
  const url = ""+id;
  return (
    <div>
    <Card className={classes.root}>
    <CardContent align="center">
    <Typography className={classes.title} color="textSecondary" gutterBottom>
          {bull}상품권 수령 QR코드
        </Typography>
        <QRCode size = "100" value={url} />
    </CardContent>
    </Card>
    </div>
  );
}

export default GetVoucherView;
