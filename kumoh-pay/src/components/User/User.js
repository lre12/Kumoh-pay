import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import UserDelete from './UserDelete';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

class User extends React.Component {
    render() {
        let infoLink = "/info";
        
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.userGroup}<small>{this.props.permit}</small></TableCell>
                <TableCell>{this.props.charge}</TableCell>
                <TableCell>{this.props.recentUseDate}</TableCell>
                <TableCell>
                    <Button variant="contained" href="info">
                        <Link to={infoLink} color="inherit" id={this.props.id}>상세정보</Link>
                    </Button>
                </TableCell>
                <TableCell><UserDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>

        )
    }
}
export default User;
