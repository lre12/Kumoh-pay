import React, { useState, useEffect } from 'react';
import { post } from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  button: {
    backgroundColor: '#E6E6E6',
  },
}));

const UpdateInfoView = ({ setHasCookie, removeCookie }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [charge, setCharge] = useState(null);
  const [userGroup, setUserGroup] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const getInfoApi = () => {
      return new Promise((resolve, reject) => {
        fetch('/app/info', {
          signal: signal,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => resolve(res.json()))
          .catch(err => reject(err));
      });
    };
    const onInfoLoad = async () => {
      try {
        const response = await getInfoApi();
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
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changeInfoApi = async ()=>{
    const url = '/app/info/update';
        let res;
       await post(url,{
          id : id,
          pwd : values.password
        }).then(function (response) {
          res = response;
          console.log(response);
        })
        return res;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await changeInfoApi({
            user_id : id,
            user_pwd : values.password
        });
        console.log(response);
        console.log('zz');
        if (response.data.result === 'ok') {
            alert('수정 성공!')
        }
    } catch (err) {
        console.error('login error', err);
        alert('회원정보수정에 실패하였습니다. 잠시 후 다시 시도해주세요.')
    }
};

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Card className={classes.root}>
      <CardContent align="center">
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {bull}회원 정보 수정
        </Typography>
        <TextField
          label="기본정보"
          id="studentId"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">학번</InputAdornment>,
          }}
          value={id}
        />
        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
          <Input
            id="studnetName"
            value={name}
            startAdornment={<InputAdornment position="start">이름</InputAdornment>}
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={charge}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </CardContent>
      <CardActionArea>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button type="submit" className={classes.button}>수정</Button>
        </CardActions>
      </CardActionArea>
    </Card>
    </form>

  );
}

export default UpdateInfoView;
