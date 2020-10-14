import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

const UserDelete = (props) => {
    const [open, setOpen] = useState(false);

    const deleteUser = (id) => {
        const url = '/api/users/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        setOpen(false);
        props.handleChangeData();
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
                삭제
            </Button>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle onClick={() => setOpen(false)}>
                    사용자삭제
                </DialogTitle>
                <DialogContent>
                    <Typography align="center">
                        {props.name}
                    </Typography>
                    <Typography align="center">
                        상품권 보유량: {props.charge}
                    </Typography>
                    <br/>
                    <Typography gutterBottom variant="body2">
                        해당 사용자를 삭제하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e) => {deleteUser(props.id)}}>삭제</Button>
                    <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default UserDelete;