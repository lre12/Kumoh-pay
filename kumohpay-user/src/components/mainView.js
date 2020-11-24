import React, {useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid'
import LastDeal from './LastDeal';
import UserStore from '../stores/UserStore';

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

  const userStore = useContext(UserStore.context)

  const stateRefresh = async () => {
    const getResponse = await userStore.walletGet("queryPoint", props.id);
    console.log(getResponse);
    await props.setPoint(getResponse.data.result.Amount);
  };


  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div>
      <Card className={classes.root}>
      <CardContent>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {bull}사용자 계좌
        </Typography>
        <Grid contianer direction="row" justify="flex-end" alignItems="center">
        <IconButton
        color="inherit"
        aria-label="close card"
        size="small"
        onClick={stateRefresh}
        >
          <RefreshIcon className={classes.icon} color="textSecondary" />
        </IconButton>
        </Grid>
      </Grid>
        <Typography variant="h5" component="h2">
         학번 : {props.id}
        </Typography>
        <Typography variant="h5" component="h2">
         이름 : {props.name}
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
    </Card>
    <br></br>
    <LastDeal id={props.id} orders={props.orders} setOrders={props.setOrders} />
    </div>
  );
}
export default MainView;
