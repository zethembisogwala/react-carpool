import React from "react";

import './trip.css';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "../../UI/button/button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Trip = (props) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Card className={[classes.root, 'Trip'].join(' ')}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.user.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.from} {bull} {props.to}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.date}
        </Typography>
      </CardContent>
      <CardActions className="CardActions">
        <Button size="small">Offer ride</Button>
      </CardActions>
    </Card>
  );
};

export default Trip;
