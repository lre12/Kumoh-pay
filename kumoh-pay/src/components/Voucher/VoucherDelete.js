import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

const VoucherDelete = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const deleteVoucher = () => {
        { parseInt(props.voucher, 10) - parseInt(value, 10) < 0 ?
            props.setVoucher(parseInt(0, 10)):
            props.setVoucher(parseInt(props.voucher - value, 10))}
        setValue('');
        setOpen(false)
    };

    const handleValue = (event) => {
        setValue(event.target.value)
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
                삭제
            </Button>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>
                    상품권 삭제
                </DialogTitle>
                <DialogContent>
                    <TextField
                    id="delVoucher"
                    label="금액"
                    type="number"
                    value={value}
                    onChange={value < 0 ? setValue('') : handleValue }
                    inputProps={{ min: 0 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => {deleteVoucher()}}>확인</Button>
                    <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>취소</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default VoucherDelete;