import React, {useState} from 'react';
import { post } from 'axios';
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

export default function UserGroupChange(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.permit);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlePermitSubmit = (event) => {
    event.preventDefault()
    changePermit()
    .then((response) => {
      console.log(response.data);
    })
    handleClose();
  }

  const changePermit = () => {
    const url = '/api/permit';
    return post(url, {
        id: props.id,
        permit: value,
    })
  };

  return (
    <form className={classes.root} >
        <div>
        <React.Fragment>
          { props.userGroup === "판매자" ?
          <Button variant="contained" color="primary" onClick={handleClickOpen}>사용자 권한 변경</Button> :
          <Button variant="contained" color="primary" onClick={handleClickOpen} disabled>사용자 권한 변경</Button>
          }
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>사용자 권한 변경</DialogTitle>
        <DialogContent>
          <form className={classes.form}>
            <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                    <RadioGroup value={value} onChange={handleChange}>
                        <FormControlLabel value="판매자" control={<Radio />} label="판매자(승인완료)" />
                        <FormControlLabel value="승인대기" control={<Radio />} label="판매자(승인대기)" />
                    </RadioGroup>
                </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary" onClick={handlePermitSubmit}>변경</Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
        </div>
    </form>
  );
}