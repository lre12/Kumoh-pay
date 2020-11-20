import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {observer} from "mobx-react"
import UserStore from '../stores/UserStore'
import Kit from '../img/KIT.png';
import '../index.css';

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img: {
    height : '50%',
    width : '50%',
  }
}));

const Login = observer(({ setHasCookie, setPoint}) => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');


  const classes = useStyles();
  const userStore = useContext(UserStore.context)


  const handleSubmit = async (e) => {
    let response;
    e.preventDefault();
    if (!userId || !userPw) {
      return;
    }
    try {
      response = await userStore.loginApi(userId,userPw);
      console.log(response);
      if (response.data.result === 'ok') {
        await userStore.walletEnroll(userId).then(setHasCookie(true));
        const getResponse = await userStore.walletGet("queryPoint", userId);
        await console.log(getResponse.data.result.Amount);
        await setPoint(getResponse.data.result.Amount)
      } else {
        throw new Error(response.error);
      }
    } catch (err) { 
      if(response.data.result === 'NoPermit'){
        alert('판매자 권한 승인을 받지 못했습니다. 관리자에게 문의하세요.');
      }else if(response.data.result === 'fail'){
        alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
      }else{
        alert('로그인에 실패했습니다.')
      }
      setUserId('');
      setUserPw('');
      console.error('login error', err);
    }
  };
  return (
    <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <img className={classes.img} src={Kit} alt="금오공대" id="kit-img" />
            <Typography component="h1" variant="h5">
              금오페이 로그인
        </Typography>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="studentID"
                label="학번"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                name="studentID"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={userPw}
                onChange={e => setUserPw(e.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                로그인
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button variant="conatined" color="blue"  onClick={() => { alert('관리자에게 문의 바랍니다.') }} >비밀번호 찾기</Button>
                </Grid>
                <Grid item>
                  <Link to="/join">
                  <Button>회원가입</Button>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    </div>
  );
})
export default Login;