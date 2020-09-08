import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
  semititle: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E6E6E6',
  },
});

export default function MainView() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {bull}사용자 계좌
        </Typography>
        <Typography variant="h5" component="h2">
          20171343 손우진
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        학생
        </Typography>
        <Typography className={classes.semititle}>
        {bull}잔액
        </Typography>
        <Typography variant="body2" component="p">
          20000원
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button className={classes.button}>송금하기</Button>
      </CardActions>
    </Card>
  );
}
