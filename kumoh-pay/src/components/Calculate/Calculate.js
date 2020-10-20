import React, {useState} from 'react';
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

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
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
    const data= useState([]);

    const handleCalculate = () => {
        setOpen(true)
    };

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-start"
                className={classes.formControlLabel}
            >
                <Button variant="contained" color="primary" onClick={(e) => {handleCalculate()}}>
                    정산
                </Button>
            </Grid>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle onClick={() => setOpen(false)}>
                    정산이 완료되었습니다!
                </DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">번호</TableCell>
                                    <TableCell align="center">판매자</TableCell>
                                    <TableCell align="center">상품권거래량</TableCell>
                                    <TableCell align="center">최근정산</TableCell>
                                    <TableCell align="center">상세정보</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((user) => (
                                <TableRow key={user.name}>
                                    <TableCell align="center">{user.calories}</TableCell>
                                    <TableCell align="center">{user.name}</TableCell>
                                    <TableCell align="center">{user.charge}</TableCell>
                                    <TableCell align="center">{user.recentDate}</TableCell>
                                    <TableCell align="center">{user.protein}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => {setOpen(false)}}>확인</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default Calculate;