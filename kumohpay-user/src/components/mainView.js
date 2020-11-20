import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LastDeal from './LastDeal';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
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
const MainView = (props) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div>
      <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {bull}사용자 계좌
        </Typography>
        <Typography variant="h5" component="h2">
         학번 : {props.id}  이름 : {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.userGroup}
        </Typography>
        <Typography className={classes.semititle}>
        {bull}잔액
        </Typography>
        <Typography variant="body2" component="p">
          {props.charge}원
        </Typography>
      </CardContent>
      <Divider />
      <CardActions style={{justifyContent: 'center'}}>
        <Button className={classes.button}>송금하기</Button>
      </CardActions>
    </Card>
    <br></br>
    <LastDeal id={props.id}  />
    </div>
  );
}
export default MainView;
