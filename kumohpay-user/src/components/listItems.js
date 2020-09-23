import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import PaymentIcon from '@material-ui/icons/Payment';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {  Link } from "react-router-dom";


export const mainListItems = (
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
    <Link to="/WebView/update" style={{ textDecoration: 'none',  color: 'black'}}>
    <ListItem button>
      <ListItemIcon>
        <EditIcon style={{ textDecoration: 'none',  color: 'black'}} />
      </ListItemIcon>
      
      <ListItemText primary="회원 정보 수정" />
     
    </ListItem>
    </Link>
    <Link to="/" style={{ textDecoration: 'none',  color: 'black'}} >
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="로그아웃" />
    </ListItem>
    </Link>
  </div>
);

export const homeSecondaryListItems = (
  <div>
    <Link to="/WebView/update" style={{ textDecoration: 'none',  color: 'black'}} >
    <ListItem button>
      <ListItemIcon>
      
        <EditIcon />
      
      </ListItemIcon>
      <ListItemText primary="회원 정보 수정" />
    </ListItem>
    </Link>
    <Link to="/" style={{ textDecoration: 'none',  color: 'black'}} >
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="로그아웃" />
    </ListItem>
    </Link>
  </div>
);