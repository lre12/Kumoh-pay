import React, {useState, useEffect} from "react";
import { fade } from '@material-ui/core/styles/colorManipulator';
import Pagination from '@material-ui/lab/Pagination';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import UserDelete from './UserDelete';
import TableHeads from './TableHeads';
import UserDetail from './UserDetail';



const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      minWidth: 1080
    },
    menu: {
      marginTop: 15,
      marginBottom: 15,
      display: 'flex',
      justifyContent: 'center',
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
    },
    table: {
      minWidth: 750
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.10),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.20),
      },
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '-15%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'right',
    },
    inputRoot: {
      color: 'primary',
      width: '70%',
      justifyContent: 'center',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 150,
        },
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100
    },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: "id", label: "ID" },
    { id: "name", label: "이름" },
    { id: "userGroup", label: "사용자분류" },
    { id: "permit", label: "판매허가" },
    { id: "charge", label: "상품권 보유량" },
    { id: "recentUseDate", label: "최근이용" },
  ];

export default function UserView({ setHasCookie}) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKey, setSearchKey] = useState('id');
  const [userGroups, setUserGroups] = useState("판매자");
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(25); // 페이지 당 갯수
  const [count, setCount] = useState(1); //총 페이지 수

  const handlePageSize = (event) => {
    setPageSize(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleChangeData = async () => { searchKeyword === "" ? handleDataAll(): handleData() };

  useEffect(() => {
    parseInt(data.length, 10) > 0 ?
      setCount(Math.ceil((data.length + 1) / pageSize)) :
      setCount(1)
  }, [data, pageSize]);

  const handleDataAll = async () => {
    await fetch("/api/users")
    .then((response) => response.json())
    .then((data) => 
        setData(data)
    )
    .catch(err => console.log(err));
  };

  const handleData = () => {
    if(userGroups === "전체"){
      handleAllSearch()
    }else if(userGroups === "판매자"){
      handleSellerSearch()
    }else{
      handleUserSearch()
    };
    setOpen(false)
    console.log(count + " " + page);
  };

  const handleAllSearch = async () => {
    searchKey === "id" ?
      await fetch("/api/users/all/id/" + searchKeyword)
      .then((response) => response.json())
      .then((data) => {
      setData(data)
      }) :
      await fetch("/api/users/all/name/" + searchKeyword)
      .then((response) => response.json())
      .then((data) => 
      setData(data)
      )
  }

  const handleSellerSearch = async () => {
    searchKey === "id" ?
      await fetch("/api/users/seller/id/" + searchKeyword)
      .then((response) => response.json())
      .then((data) => 
      setData(data)
      ) :
      await fetch("/api/users/seller/name/" + searchKeyword)
      .then((response) => response.json())
      .then((data) => 
      setData(data)
      )
  }

  const handleUserSearch = async () => {
    searchKey === "id" ?
      await fetch("/api/users/user/id/" + searchKeyword)
      .then((response) => response.json())
      .then((data) => 
      setData(data)
      ) :
      await fetch("/api/users/user/name/" + searchKeyword)
      .then((response) => response.json())
      .then((data) => 
      setData(data)
      )
    
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchKey = (event) => {
    setSearchKey(event.target.value);
  };

  const handleSearchKeyword = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleUserGroups = (event) => {
    setUserGroups(event.target.value);
  };

  return (
    <div className={classes.root}>
        <div className={classes.menu}>
        <Grid>
        <Grid item xs={12} 
            align="center">
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            사용자 관리
          </Typography>
        </Grid>
        <Grid item xs={12} 
            align="center">
          <FormControl component="searchForm">
            <RadioGroup
              row
              aria-label="searchKey"
              name="gender1"
              value={searchKey}
              onChange={handleSearchKey}
              align="center"
            >
              <FormControlLabel
                value="id"
                control={<Radio size="small" />}
                label="ID 검색"
              />
              <FormControlLabel
                value="name"
                control={<Radio size="small" />}
                label="이름 검색"
              />
            </RadioGroup>
          </FormControl>
          <Select
            value={userGroups}
            onChange={handleUserGroups}
            className={classes.formControl}
          >
            <MenuItem value={"전체"}>전체</MenuItem>
            <MenuItem value={"판매자"}>판매자</MenuItem>
            <MenuItem value={"학생"}>학생</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} 
            align="center">
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder={searchKey === "id" ? "ID 검색" : "이름 검색" }
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                id="searchKeyword"
                autoFocus={true}
                value={searchKeyword}
                onChange={handleSearchKeyword}
            />
            <Button variant="contained" color="primary" onClick={() => handleChangeData()}>
                검색
            </Button>
        </div>
          </Grid>
            <Collapse in={open} timeout="0" alignItems="center">
              키워드를 입력해주세요.
            </Collapse>
          </Grid>
        </div>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHeads
              classes={classes}
              order={order}
              orderBy={orderBy}
              headCells={headCells}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice((page-1) * pageSize, (page-1) * pageSize + pageSize)
                .map((user, index) => {
                  return (
                    <TableRow>
                      <TableCell align="center">{user.id}</TableCell>
                      <TableCell align="center">{user.name}</TableCell>
                      <TableCell align="center">{user.userGroup}</TableCell>
                      <TableCell align="center">{user.permit}</TableCell>
                      <TableCell align="center">{user.charge}</TableCell>
                      <TableCell align="center">{user.recentUseDate}</TableCell>
                      <TableCell><UserDetail setHasCookie = {setHasCookie} handleChangeData={handleChangeData} id={user.id} name={user.name} userGroup={user.userGroup} permit={user.permit} charge={user.charge}/></TableCell>
                      <TableCell><UserDelete setHasCookie = {setHasCookie} handleChangeData={handleChangeData} id={user.id} name={user.name} charge={user.charge}/></TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.pagination}> 
            <Pagination
              count={count}
              page={page}
              pageSize={pageSize}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
            />
            <Select
            value={pageSize}
            onChange={handlePageSize}
            className={classes.formControl}
            >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </div>
       
        {/* <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </div>
  );
}
