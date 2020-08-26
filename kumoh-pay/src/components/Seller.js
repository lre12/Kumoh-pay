import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import SellerDelete from './SellerDelete'

class Seller extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.owner}</TableCell>
                <TableCell>{this.props.phone}</TableCell>
                <TableCell>{this.props.charge}</TableCell>
                <TableCell><SellerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}

export default Seller;