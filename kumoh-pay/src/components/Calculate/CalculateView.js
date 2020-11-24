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
import Calculate from './Calculate';
import { handleCalcData } from '../User/UserData';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        minWidth: 600,
        marginTop: 110,
      },
    table: {
        minWidth: 750,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
        textAlign: "center",
        marginBottom: 10,
    },
}));


export default function CalculateView({userId, setHasCookie}) {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect (() =>  {
    handleData();
  }, [])

  const handleData = async () => {
    await handleCalcData(setData);
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
            정산 조회
            </Typography>
        </div>
    <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">판매자</TableCell>
            <TableCell align="center">정산</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="center">{user.id}</TableCell>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center"><Calculate userId={userId} id={user.id} name={user.name}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}