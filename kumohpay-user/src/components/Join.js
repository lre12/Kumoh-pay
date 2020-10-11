import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import UserStore from '../stores/UserStore'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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






const Join = () => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userName, setUserName] = useState('');
    const [userMail, setUserMail] = useState('');
    const [authNumber, setAuthNumber] = useState('');
    const [isJoinSuccess, setJoinSuccess] = useState(false);
    const userStore = useContext(UserStore.context)
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userStore.createUserApi(userId,userPw,userName,authNumber);
            console.log(response.data.result);
            if (response.data.result === 'ok') {
                setJoinSuccess(true);
            }
        } catch (err) {
            console.error('login error', err);
            alert('회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.')
        }
    };

    const sendMail = async (e) => {
        e.preventDefault();
        try{
            const response = await userStore.sendMail(userMail)
            if(response.data.result==='ok'){
                alert('mail전송완료');
            }
        } catch(err){
            alert('mail전송실패')
        }
    }

    const classes = useStyles();

  return (
    <div>
        {!isJoinSuccess && (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원 가입
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="user_id"
                label="학번"
                name="user_id"
                autoComplete="user_id"
                value={userId}
                onChange={e => setUserId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                value={userPw}
                onChange={e => setUserPw(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="이름"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="kumoh-mail ID"
                label="금오 웹 메일 ID"
                name="kumoh-mail ID"
                value={userMail}
                onChange={e => setUserMail(e.target.value)}
              />
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={sendMail}
            className={classes.submit}
          >
            메일 전송
          </Button>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="authNumber"
                label="인증번호"
                name="authNumber"
                value={authNumber}
                onChange={e => setAuthNumber(e.target.value)}
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
            회원 가입
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
                <Link to="/login">아이디가 있으신가요?</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>)}
    {isJoinSuccess && (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
          회원 가입을 축하합니다!
            </Typography>
            <Typography component="h1" variant="h5">
            <Link to="/login">로그인</Link>
            </Typography>
        </Container>
    )}
    </div>
  );
};
export default Join;
