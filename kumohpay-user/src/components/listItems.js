import React from 'react';
import styles from './App.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import PaymentIcon from '@material-ui/icons/Payment';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const black = {
  color: "black"
};

export const mainListItems = (
  <Router>
    <div>
    <ListSubheader inset>상품권 관리</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary="결제" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="상품권 수령" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="거래 내역 조회" />
    </ListItem>
  </div>
  </Router>
  
);

export const homeMainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary="결제" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="상품권 수령" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="거래 내역 조회" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>사용자 관리</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <EditIcon style={{ textDecoration: 'none',  color: 'black'}} />
      </ListItemIcon>
      <Link to="/update" style={{ textDecoration: 'none',  color: 'black'}}>
      <ListItemText component={Link} to={'/update'} primary="회원 정보 수정" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="로그아웃" />
    </ListItem>
  </div>
);

export const homeSecondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
      <Link to="/update" style={{ textDecoration: 'none',  color: 'black'}} >
        <EditIcon />
      </Link>
      </ListItemIcon>
      <ListItemText primary="회원 정보 수정" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="로그아웃" />
    </ListItem>
  </div>
);