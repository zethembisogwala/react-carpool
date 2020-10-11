import React, { useState, useEffect } from "react";
import axios from "axios";

import { objectToList } from "../../../helpers/functions";

import "./trip.css";
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
  const [users, setUsers] = useState([]);
  useEffect(() => {
    props.setIsBusy(true);
    axios
      .get("https://janev-2e278.firebaseio.com/users.json")
      .then((response) => {
        setUsers(objectToList(response.data));
        props.setIsBusy(false);
      })
      .catch((error) => {
        props.setIsBusy(false);
      });
  }, []);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const userId = localStorage.getItem('userId');
  let fullName = '';
  if(users.length > 0) {
      fullName = users.find(user => user.id === userId).fullName;
  }

  return (
    <Card className={[classes.root, "Trip"].join(" ")}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          { fullName }
        </Typography>
        <Typography variant="h5" component="h2">
          {props.trip.from} {bull} {props.trip.to}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.trip.date}
        </Typography>
      </CardContent>
      <CardActions className="CardActions">
        <Button onClickHandler={() => props.setOpen(true)} size="small">
          Offer ride
        </Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(Trip);
