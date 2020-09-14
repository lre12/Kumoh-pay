import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import UserGroupChange from './UserGroupChange';


const useStyles = makeStyles ((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    minWidth: 1080
  },
  grid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  grow: {
    flexGrow: 1,
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
  }
}));



const columns = [
  { id: 'num', label: '번호', minWidth: 50 },
  { id: 'trader', label: '거래자', minWidth: 170 },
  {
    id: 'send',
    label: '받음',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'receive',
    label: '보냄',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'charge',
    label: '잔고',
    minWidth: 150,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: '거래 날짜',
    minWidth: 150,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

let num = 0;

function createData( trader, receive, send, charge, date) {
  num = num + 1;
  return { num, trader, receive, send, charge, date };
}

const rows = [
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'), 
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
];

export default function UserInfo() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div>
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
          사용자 상세 정보
        </Typography>
      </div>
      <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Container className={classes.grid}>
          <Table >
            <TableRow>
              <TableCell>이름:</TableCell>
              <TableCell></TableCell>
              <TableCell>학번:</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>사용자 분류:</TableCell>
              <TableCell></TableCell>
              <TableCell>보유량</TableCell>
              <TableCell></TableCell>
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
              <UserGroupChange />
          </Grid>
          <Grid className={classes.button}>
              <Button variant="contained" color="primary">거래 내역 조회</Button>
          </Grid>
        </Grid>
      </Grid>
      
      
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>

    </div>
    
  );
}
