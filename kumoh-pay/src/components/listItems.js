
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Link } from "react-router-dom";

export const menuListItems = (
    <div>
        <Link to="/user" style={{textDecoration: 'none', color: 'black'}}>
            <ListItem button>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="사용자 관리" />
            </ListItem>
        </Link>
        <Link to="/present" style={{textDecoration: 'none', color: 'black'}}>
            <ListItem button>
                <ListItemIcon><SearchIcon /></ListItemIcon>
                <ListItemText primary="수여 내역 조회" />
            </ListItem>
        </Link>
        <Link to="/settlement" style={{textDecoration: 'none', color: 'black'}}>
            <ListItem button>
                <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
                <ListItemText primary="정산 조회" />
            </ListItem>
        </Link>
        
    </div>
);
        