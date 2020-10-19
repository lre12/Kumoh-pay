import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { post } from 'axios';


const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 3)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

const Login = (({ setHasCookie }) => {
  const classes = useStyles();
  const [userId, setUserId] = useState('aa');
  const [userPw, setUserPw] = useState('bb');



  const loginApi = async (userId, userPw) => {
    const url = '/api/login';
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
    console.log(userId);
    console.log(userPw);
    e.preventDefault();
    if (!userId || !userPw) {
      return;
    }
    try {
      const response = await loginApi(userId, userPw);
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
    <main className={classes.layout}>
      <Paper className={classes.paper} elevation={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography component="h2" variant="h4" gutterBottom>
            로그인
          </Typography>
          <Typography component="h4" gutterBottom>
            금오공과대학교 금오페이 관리페이지
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="id"
            label="아이디"
            name="id"
            autoComplete="id"
            autoFocus
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="비밀번호"
            type="password"
            autoComplete="current-password"
            value={userPw}
            onChange={e => setUserPw(e.target.value)}
          />
          <Box mb={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >로그인
            </Button>
          </Box>
        </form>
      </Paper>
    </main>
  );
})

export default Login;
