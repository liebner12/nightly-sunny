import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  list: {
    display: "flex",
    overflowX: "auto",
    whiteSpace: "nowrap",
    textAlign: "center",
    fontSize: "1.1rem",
    justifyContent: "space-between",
    width: "100%",
  },
  item: {
    marginRight: "2rem",
  },
});

export default function Hourly({ tempHourly, weatherIcon }) {
  const classes = useStyles();
  return (
    <div className={classes.list}>
      {tempHourly.map((item, id) => (
        <div className={classes.item} key={id}>
          <Typography gutterBottom>{item.hour}</Typography>
          <Typography variant="h6" gutterBottom>
            <FontAwesomeIcon icon={weatherIcon(item.weatherId, item.hour)} />
          </Typography>
          <Typography>{item.temp}&deg;C</Typography>
        </div>
      ))}
    </div>
  );
}
