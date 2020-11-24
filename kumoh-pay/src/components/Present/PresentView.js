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
  const [dataAll, setDataAll] = useState([]);
  const [data, setData] = useState([]);
  const [firstDate, setFirstDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);
  const [search, setSearch] = useState(null);
  let count = 0;

  useEffect (() => {
    handleData();
    console.log(data);
    return (console.log(data));
  }, [])


  const handleData = async () => {
    try {
      const getResponse = await walletGet("getAllHistory", userId);
      if(await Array.isArray(getResponse.data.result)){
        await setDataAll(getResponse.data.result);
        await setData(getResponse.data.result);
      } else {
        await setDataAll([]);
      }
      await console.log(data);
    } catch(e) {

    }

  }

  const handleSearchUser = () => {

    if (search==null) {
      setData(dataAll);
    } else {
      setData(dataAll.filter(datas => datas.sender === search));
    }
  }

  const handleSearchData = async () => {
    if (firstDate===null || secondDate==null) {
      alert("날짜를 입력하세요.");
    } else {
      await handleSearchUser();
      await setData(data.filter(datas => firstDate <= datas.date && datas.date <= secondDate));
    }
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
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
            거래 내역 조회
            </Typography>
        </div>
        <div className={classes.button}>
            <TextField id="firstDate" type="date" value={firstDate} onChange={handleFirstChange} />
            <TextField id="secondDate" type="date" value={secondDate} onChange={handleSecondChange} />
            <Button variant="contained" color="primary" onClick={() => {handleSearchData()}}>검색</Button>
            <Button variant="contained" color="primary" onClick={() => {handleData()}}>조회 갱신</Button>
        </div>
        <div className={classes.button}>
          <TextField id="searchUser" label="보낸사람 검색" value={search} onChange={handleSearch} />&nbsp;
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
          { data.map((datas) => (
            <TableRow>
                <TableCell align="center">{count=count+1}</TableCell>
                <TableCell align="center">{datas.sender}</TableCell>
                <TableCell align="center">{datas.receiver}</TableCell>
                <TableCell align="center">{datas.amount}원</TableCell>
                <TableCell align="center">{datas.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}