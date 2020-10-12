import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import {observer} from "mobx-react"
import UserStore from '../stores/UserStore'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const SendVoucherView = ({ setHasCookie, removeCookie }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [charge, setCharge] = useState(null);
  const [userGroup, setUserGroup] = useState(null);
  const [sendMoney, setSendMoney] = useState(null);
  let sendId = useParams();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        //전송
    } catch (err) {
        //에러
    }
};

  return (
    <div>
<Container component="main" maxWidth="xs">
  <CssBaseline />
  <div className={classes.paper}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
      {/* 아이콘바꾸기 */}
    </Avatar>
    <Typography component="h1" variant="h5">
      상품권 전송
    </Typography>
    <form onSubmit={handleSubmit} className={classes.form} noValidate>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="sendMoney"
            label="보낼 상품권 금액"
            name="sendMoney"
            value={sendMoney}
            onChange={e => setSendMoney(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth   
            id="sendIdr"
            label="보낼아이디"
            name="sendId"
            value={sendId}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        전송
      </Button>
      <Grid container justify="flex-end">
      </Grid>
    </form>
  </div>
</Container>
</div>
  );
}

export default SendVoucherView;
