import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {walletGet} from '../Wallet';



const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        minWidth: 1080,
        marginTop: 70,
      },
    table: {
        minWidth: 750,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
        textAlign: "center",
    },
    button: {
      textAlign: 'right',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

export default function PresentView({ userId, setHasCookie}) {
  const classes = useStyles();
  const [isReceive, setIsReceive] = useState(false);
  const [data, setData] = useState([]);
  const [firstDate, setFirstDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);
  let count = 0;

  useEffect (() => {
    handleData();
  }, [])

  useEffect (() => {
  }, [setData])

  const handleData = async () => {
    try {
      const getResponse = await walletGet("getAllHistory", userId);
      if(await Array.isArray(getResponse.data.result)){
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

  const handleSearchData = async () => {
    handleData();
    if (firstDate===null || secondDate==null) {
      alert("날짜를 입력하세요.");
    } else {
      await setData(data.filter(dt => dt.date > firstDate && dt.date < secondDate));
    }
    await console.log(firstDate);
    await console.log(secondDate);
    await console.log(data);
  }

  const handleFirstChange = (event) => {
    setFirstDate(event.target.value);
  };

  const handleSecondChange = (event) => {
    setSecondDate(event.target.value);
  };

  return (
    <div className={classes.root}>
        <div className={classes.menu}>
            <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
            >
            수여내역 조회
            </Typography>
        </div>
        <div className={classes.button}>
            <TextField id="firstDate" type="date" value={firstDate} onChange={handleFirstChange} />
            <TextField id="secondDate" type="date" value={secondDate} onChange={handleSecondChange} />
            <Button variant="contained" color="primary" onClick={() => {handleSearchData()}}>검색</Button>
            <Button variant="contained" color="primary" onClick={() => {handleData()}}>전체 조회</Button>
        </div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
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
                <TableCell align="center">{dt.amount}원</TableCell>
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
  );
}