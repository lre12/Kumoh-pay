import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import QrReader from 'react-qr-reader'
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



const SendVoucherScanner = ({ setHasCookie, setPoint }) =>{
    const [result, setResult] = useState('QR코드를 찍어주세요')
    const [isScan, setIsScan] = useState(false)
    const [id, setId] = useState(null);
    const [sendMoney, setSendMoney] = useState(null);
    const classes = useStyles();
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
    }, [id, setHasCookie]);

    const handleScan = (data) =>{
        if (data) {
            setResult(data)
            setIsScan(true)
            alert(data);
          }
    }

    const handleError = (err) =>{
        console.error(err)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const dealInfo = [id,result,sendMoney];
          const response = await userStore.walletPost("changePointOwner",dealInfo);
          const resultMessage = response.request.response.split(':')
          const msg = resultMessage[2].split(',')[0];
          console.log(msg.subString(1,msg.length-1));
          if(msg.subString(1,msg.length-1) === "Successfully change point owner"){
            alert("송금 완료!")
            const getResponse = await userStore.walletGet("queryPoint", id);
            await setPoint(getResponse.data.result.Amount);
          }else{
            alert("재요청 바랍니다.")
          }
        } catch (err) {
            //에러
        }
    }
    if(!isScan){
        return (
            <div>
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '90%' }}
              />
              <p>{result}</p>
            </div>
          )
    }
    else{
        return (<div>
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
                        id="id"
                        label="보내는 사람 ID"
                        name="id"
                        value={id}
                      />
                    </Grid>
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
                        value={result}
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
            </div>)
    }
}
export default SendVoucherScanner;