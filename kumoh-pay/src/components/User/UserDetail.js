import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
// import UserGroupChange from './UserGroupChange';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import UserGroupChange from './UserGroupChange';

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
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const columns = [
  { id: 'num', align: 'right', label: '번호' },
  { id: 'trader', align: 'right', label: '거래자'},
  {
    id: 'send',
    label: '받음',
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'receive',
    label: '보냄',
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'charge',
    label: '잔고',
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: '거래 날짜',
    align: 'right',
    format: (value) => value.toLocaleString
  },
];

let num = 0;

function createData( trader, receive, send, charge, date) {
  num = num + 1;
  return { num, trader, receive, send, charge, date };
}

const rows = [
  createData('20150292', '너', 6000, 0, 12000, '2020-09-14'),
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserDetailView(props, {setHasCookie}) {
  const classes = useStyles();
  const [data, setData] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.handleChangeData();
  };

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
                <TableRow tabIndex={-1} key={row.code}>
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
      </div>
    </Dialog>
    </div>
  );
}