import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import UserDelete from './UserDelete';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

class User extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.code}</TableCell>
                <TableCell>{this.props.trader}</TableCell>
                <TableCell>{this.props.send}</TableCell>
                <TableCell>{this.props.receive}</TableCell>
                <TableCell>{this.props.charge}</TableCell>
                <TableCell>{this.props.date}</TableCell>
            </TableRow>

        )
    }
}
export default User;
