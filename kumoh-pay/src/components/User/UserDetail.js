import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import UserGroupChange from './UserGroupChange';
import {walletEnroll, walletGet} from '../Wallet';


const useStyles = makeStyles ((theme) => ({
  root: {
    flexGrow: 1,
    width: "99%",
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  grid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  title: {
    padding: theme.spacing(2.5),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  button: {
    padding: theme.spacing(0.5),
    marginRight: 15,
    textAlign: 'right',
  },
  table: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  appBar: {
    position: 'relative',
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserDetailView(props, {setHasCookie}) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isReceive, setIsReceive] = useState(false);
  let count = 0;

  const handleData = async () => {
    try {
      await walletEnroll(props.id)
      const getResponse = await walletGet("getHistory", props.id);
      await console.log([getResponse.data.result]);
      await console.log(Array.isArray(getResponse.data.result));
      if(Array.isArray(getResponse.data.result)){
        await setData(getResponse.data.result);
      } else {
        await setData([]);
      }
      await console.log(data);

    } catch(e) {

    }

    if(data !== null) {
      await setIsReceive(true);
    }
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {

    await walletGet("getHistory", props.userId);
    await setOpen(false);
    await props.handleChangeData();
  };

  return (
    <div>
      <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        상세정보
      </Button>
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} >
      <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              사용자 상세 정보
            </Typography>
          </Toolbar>
      </AppBar>
      <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Container className={classes.grid}>
          <Table >
            <TableRow>
              <TableCell>이름:</TableCell>
              <TableCell>{props.name}</TableCell>
              <TableCell>ID:</TableCell>
              <TableCell>{props.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>사용자분류:</TableCell>
              <TableCell>{props.userGroup}</TableCell>
              <TableCell>상품권보유량:</TableCell>
              <TableCell>{props.charge}원</TableCell>
            </TableRow>
          </Table>
          </Container>
        </Grid>
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4}
          container
          direction="column"
          justify="flex-end"
          alignItems="flex-end"
          >
          <Grid className={classes.button}>
            <UserGroupChange setHasCookie = {setHasCookie} id={props.id} userGroup={props.userGroup} permit={props.permit}/>
          </Grid>
          <Grid className={classes.button}>
            <Button variant="contained" color="primary" onClick={() => handleData()}>거래 내역 조회</Button>
          </Grid>
        </Grid>
      </Grid>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">보낸이ID</TableCell>
              <TableCell align="center">받은이ID</TableCell>
              <TableCell align="center">금액</TableCell>
              <TableCell align="center">지급날짜</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
          { isReceive === true ? (
              data.map((dt) => (
                <TableRow key={dt.receiver}>
                  <TableCell align="center">{count=count+1}</TableCell>
                  <TableCell align="center">{dt.sender}</TableCell>
                  <TableCell align="center">{dt.receiver}</TableCell>
                  <TableCell align="center">{dt.amount}</TableCell>
                  <TableCell align="center">{dt.date}</TableCell>
                </TableRow>
              ))) : (
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </Dialog>
    </div>
  );
}