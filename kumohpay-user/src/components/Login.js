import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { post } from 'axios';
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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



const Login = ({ setHasCookie }) => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const classes = useStyles();

  const loginApi = async () => {
    const url = '/app/auth/login';
    let res;
    await post(url, {
      id: userId,
      pwd: userPw,
    }).then(function (response) {
      res = response;
      console.log(response);
    })
    return res;
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !userPw) {
      return;
    }
    try {
      const response = await loginApi();
      console.log(response);
      if (response.data.result === 'ok') {
        setHasCookie(true);
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      alert('로그인에 실패했습니다.');
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
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
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
                  <Link href="#" variant="body2">
                    비밀번호 찾기
              </Link>
                </Grid>
                <Grid item>
                  <Link to="/join">
                  {"회원가입"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    </div>



    //     <div>
    //       <h2>Login</h2>
    //       <form
    //         
    //       >
    //         <input
    //           type="text"
    //           name="user_id"
   
    //           placeholder="id"
    //         />
    //         <input
    //           type="password"
    //           name="user_pw"

    //           placeholder="pw"
    //         />
    //         <button
    //           type="submit"
    //         >
    //           Login
    // </button>
    //       </form>

    //     </div>
  );
};
export default Login;