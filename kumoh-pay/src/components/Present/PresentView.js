
import React, {useState} from 'react';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

let count = 0;

export default function PresentView({ setHasCookie}) {
  const classes = useStyles();

  const data = useState([]);//
  const [firstDate, setFirstDate] = useState();
  const [secondDate, setSecondDate] = useState();

  //const handleData = async () => {}

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
            수여내역 요청
            </Typography>
        </div>
        <div className={classes.button}>
            <TextField id="firstDate" type="date" value={firstDate} inputProps={handleFirstChange} />
            <TextField id="secondDate" type="date" value={secondDate} inputProps={handleSecondChange} />
            <Button variant="contained" color="primary">검색</Button>
        </div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">번호</TableCell>
            <TableCell align="center">학번</TableCell>
            <TableCell align="center">이름</TableCell>
            <TableCell align="center">보유량</TableCell>
            <TableCell align="center">지급내역</TableCell>
            <TableCell align="center">지급일</TableCell>
            <TableCell align="center">사유</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.name}>
                <TableCell align="center">{count}</TableCell>
                <TableCell align="center">{rows.id}</TableCell>
                <TableCell align="center">{rows.name}</TableCell>
                <TableCell align="center">{rows.charge}</TableCell>
                <TableCell align="center">{rows.present}</TableCell>
                <TableCell align="center">{rows.presentDate}</TableCell>
                <TableCell align="center">{rows.etc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}