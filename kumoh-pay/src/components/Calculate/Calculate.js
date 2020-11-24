import React, {useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {walletGet, walletPost, walletEnroll} from '../Wallet';

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
    },
    formControl: {
      minWidth: 80,
    },
    formControlLabel: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const Calculate = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [point, setPoint] = useState(null);


    const handlePoint = async () => {
        try {
            setOpen(true);
            await walletEnroll(props.id);
            const getResponse = await walletGet("queryPoint", props.id);
            await setPoint(getResponse.data.result.Amount);
        } catch (err) {

        }
    }

    const handleCalculate = async () => {
        if(point) {
            const sendInfo = [props.id, props.id, point];
            await walletPost("changePointOwner", sendInfo);
            await handlePoint();
        } else {

        }
    };

    const handleClose = async () => {
        await walletEnroll(props.userId);
        await setOpen(false);
    }

    return (
        <div>
            <Grid>
                <Button variant="contained" color="primary" onClick={(e) => {handlePoint()}}>
                    정산
                </Button>
            </Grid>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle onClick={() => setOpen(false)}>
                    정산
                </DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">ID</TableCell>
                                    <TableCell align="center">판매자</TableCell>
                                    <TableCell align="center">금액</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={props.userId}>
                                    <TableCell align="center">{props.id}</TableCell>
                                    <TableCell align="center">{props.name}</TableCell>
                                    <TableCell align="center">{point} 원</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" onClick={() => {handlePoint()}}>갱신</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => {handleCalculate()}}>정산</Button>
                    <Button variant="contained" color="secondary" onClick={() => {handleClose()}}>취소</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default Calculate;