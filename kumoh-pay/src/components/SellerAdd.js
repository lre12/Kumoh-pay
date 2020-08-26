import React from 'react'
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class SellerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            owner: '',
            phone: '',
            charge: '',
            open: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addSeller = this.addSeller.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault()

        this.addSeller()
        
        .then((response) => {
        
        console.log(response.data);
        
        this.props.stateRefresh();
        
        })
        this.setState({
            id: '',
            name: '',
            owner: '',
            phone: '',
            charge: ''
        })


    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addSeller() {
        const url = '/api/sellers';
        return post(url, {
            id: this.state.id,
            name: this.state.name,
            owner: this.state.owner,
            phone: this.state.phone,
            charge: this.state.charge
        })
    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    }

    handleClose() {
        this.setState({
            id: '',
            name: '',
            owner: '',
            phone: '',
            charge: '',
            open: false
        })
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    판매자 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>판매자 추가</DialogTitle>
                    <DialogContent>
                        <br />
                        <TextField label="판매자코드" type="number" name="id" value={this.state.id} onChange={this.handleValueChange} /><br />
                        <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br />
                        <TextField label="사업자" type="text" name="owner" value={this.state.major} onChange={this.handleValueChange} /><br />
                        <TextField label="전화번호" type="text" name="phone" value={this.state.gender} onChange={this.handleValueChange} /><br />
                        <TextField label="잔액" type="number" name="charge" value={this.state.charge} onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(SellerAdd)
