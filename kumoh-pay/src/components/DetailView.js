import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  div: {
    margin: theme.spacing(0.5),
  },
  title: {
    padding: theme.spacing(2.5),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

function createData(num, id, name, charge, cash, date, etc) {
  return { num, id, name, charge, cash, date, etc };
}

const rows = [
  createData(1, 20150292, "aaa", 13000, 2400, "2020.09.14", "잘해서")
];

export default function DetailView() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.div}>
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
          수여내역 조회
        </Typography>
      </div>
      <div className={classes.div}>
      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center">{row.num}</TableCell>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.charge}</TableCell>
              <TableCell align="center">{row.cash}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.etc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </div>    
    </div>
  );
}
