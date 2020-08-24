import React from 'react'
import Customer from './Customer'
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import CustomerAdd from './CustomerAdd';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const styles = theme => ({
    root: {
      width: "100%",
      minWidth: 1080
    },
    menu: {
      marginTop: 15,
      marginBottom: 15,
      display: 'flex',
      justifyContent: 'center'
    },
    paper: {
      marginLeft: 18,
      marginRight: 18
    },
    progress: {
      margin: theme.spacing.unit * 2
    },
    grow: {
      flexGrow: 1,
    },
    tableHead: {
      fontSize: '1.0rem'
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    }
  });

class CustomerView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          customers: '',
          completed: 0,
          searchKeyword: ''
        }
        this.stateRefresh = this.stateRefresh.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
      }
    
      handleValueChange(e) {
        let nextState = {};
        nextState[e.target.id] = e.target.value;
        this.setState(nextState);
      }
    
      stateRefresh() {
        this.setState({
          customers: '',
          completed: 0,
          searchKeyword: ''
        });
        this.callApi()
          .then(res => this.setState({ customers: res }))
          .catch(err => console.log(err));
      }
    
    
      componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi()
          .then(res => this.setState({ customers: res }))
          .catch(err => console.log(err));
      }
    
    
      componentWillUnmount() {
        clearInterval(this.timer);
      }
    
      callApi = async () => {
        const response = await fetch('/api/customers');
        const body = await response.json();
        return body;
      }
    
      progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
      };

    render() {

        const filteredComponents = (data) => {
            data = data.filter((c) => {
              return c.id.indexOf(this.state.searchKeyword) > -1;
            });
            return data.map((c) => {
              return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} name={c.name} major={c.major} gender={c.gender} charge={c.charge} />
            });
          }
          const { classes } = this.props;
          const cellList = ["학번", "이름", "학과", "성별", "잔액"]

        return (
            <div>
                <div className={classes.menu}>
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              학생 관리
        </Typography>
        <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="학번 검색"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                id="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
          <Table>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ?
                filteredComponents(this.state.customers) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerView)
