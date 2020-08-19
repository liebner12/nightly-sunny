import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import yellow from "@material-ui/core/colors/yellow"
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  listBox: {
    boxSizing: "border-box",
    background: "rgba(30,30,30,1)",
    padding: "2rem 0",
    marginTop: "5%",
  },
  list: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    fontSize: "1.1rem",
  },
  item: {
    margin: "0 2rem 0 0",
  },
  hr: {
    border: 0,
    backgroundColor: yellow[500],
    height: "2px",
    width: "100%",
    margin: "1rem 0",
  },
  fontWeight: {
    fontWeight: "400",
    color: grey[500],
  }
});

export default function Hourly({ tempHourly, weatherIcon }) {
  const classes = useStyles();
  return (
    <div className={classes.listBox}>
      <Container>
        <Typography className={classes.fontWeight}>EVERY 3 HOURS</Typography>
        <hr className={classes.hr} ></hr>
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
        
      </Container>
    </div>
  );
}
