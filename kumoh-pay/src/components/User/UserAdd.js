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
    },
});

class UserAdd extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            userGroup: '',
            charge: '',
            open: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addUser = this.addUser.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault()

        this.addUser()
        
        .then((response) => {
        
        console.log(response.data);
        
        this.props.stateRefresh();
        
        })
        this.setState({
            id: '',
            name: '',
            userGroup: '',
            charge: ''
        })
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addUser() {
        const url = '/api/users';
        return post(url, {
            id: this.state.id,
            name: this.state.name,
            userGroup: this.state.userGroup,
            charge: this.state.charge,
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
            userGroup: '',
            charge: '',
            open: false
        })
    }

    render() {
        return (
            <form className={styles.root} >
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    사용자 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>사용자 추가</DialogTitle>
                    <DialogContent>
                        <br />
                        <TextField label="ID" type="number" name="id" value={this.state.id} onChange={this.handleValueChange} /><br />
                        <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br />
                        <TextField label="사용자분류" type="text" name="userGroup" value={this.state.major} onChange={this.handleValueChange} /><br />
                        <TextField label="보유량" type="number" name="charge" value={this.state.charge} onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </form>
        )
    }
}
export default withStyles(styles)(UserAdd)
