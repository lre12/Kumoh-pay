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

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            userName: '',
            major: '',
            gender: '',
            charge: '',
            open: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault()

        this.addCustomer()
        
        .then((response) => {
        
        console.log(response.data);
        
        this.props.stateRefresh();
        
        })
        this.setState({
            id: '',
            userName: '',
            major: '',
            gender: '',
            charge: ''
        })


    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer() {
        const url = '/api/customers';
        return post(url, {
            id: this.state.id,
            name: this.state.userName,
            major: this.state.major,
            gender: this.state.gender,
            charge: this.state.charge
        })
    }

    handleClickOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            id: '',
            userName: '',
            major: '',
            gender: '',
            charge: '',
            open: false
        })
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    사용자 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>사용자 추가</DialogTitle>
                    <DialogContent>
                        <br />
                        <TextField label="학번" type="number" name="id" value={this.state.id} onChange={this.handleValueChange} /><br />
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
                        <TextField label="학과" type="text" name="major" value={this.state.major} onChange={this.handleValueChange} /><br />
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
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

export default withStyles(styles)(CustomerAdd)
