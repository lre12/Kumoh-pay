import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 80,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function UserGroupChange() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  
  const [value, setValue] = React.useState('female');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} >
        <div>
        <React.Fragment>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
      사용자 권한 변경
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>사용자 권한 변경</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="판매자" control={<Radio />} label="판매자" />
                        <FormControlLabel value="" control={<Radio />} label="판매자(승인 대기)" />
                    </RadioGroup>
                </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="primary" onClick={handleChange}>변경</Button>
          <Button variant="outlined" color="primary" onClick={handleClose} >닫기</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
        </div>
    </form>
    
  );
}