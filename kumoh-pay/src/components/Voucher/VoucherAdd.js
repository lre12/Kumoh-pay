import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import {walletPost, walletGet} from '../Wallet';

const VoucherAdd = ( { userId, setPoint } ) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const addVouchers = async () => {
        if (value < 100 || value % 100 != 0) {
            alert("100 단위 입력");
        } else {
            const addInfo = [userId, value];
            const response = await walletPost("createPoint", addInfo);
            const getResponse = await walletGet("queryPoint", userId);
            console.log(getResponse);
            await setPoint(getResponse.data.result.Amount);
            await setOpen(false);
        }
    };

    const handleValue = (event) => {
        setValue(event.target.value)
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                등록
            </Button>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>
                    상품권 등록
                </DialogTitle>
                <DialogContent>
                    <TextField
                    id="addVoucher"
                    label="금액"
                    type="number"
                    value={value}
                    onChange={value < 0 ? setValue('') : handleValue }
                    inputProps={{ min: 0 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => {addVouchers()}}>확인</Button>
                    <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>취소</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default VoucherAdd;