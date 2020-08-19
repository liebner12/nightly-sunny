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
    width: "100%",
    background: "rgba(30,30,30,1)",
    marginBottom: "80px",
    display: "grid",
    alignItems: "center",
    padding: "2rem 0",
  },
  list: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    fontSize: "1.1rem",
  },
  hr: {
    border: 0,
    backgroundColor: yellow[500],
    height: "2px",
    margin: "1rem 0",
  },
  fontWeight: {
    fontWeight: "400",
    color: grey[500],
  }
});

export default function List({ tempNextDays, weatherIcon }) {
  const classes = useStyles();
  return (
    <div className={classes.listBox}>
      <Container>
        <Typography className={classes.fontWeight}>NEXT 5 DAYS</Typography>
        <hr className={classes.hr} ></hr>
        <div className={classes.list}>
          {tempNextDays.map((item, id) => (
            <div key={id}>
              <Typography gutterBottom >{item.date}</Typography>
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
