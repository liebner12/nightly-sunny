import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import yellow from "@material-ui/core/colors/yellow";
import { grey } from "@material-ui/core/colors";
const useStyles = makeStyles({
  hr: {
    border: 0,
    backgroundColor: yellow[500],
    height: "2px",
    margin: "1rem 0",
  },
  center: {
    padding: "2rem 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    background: "rgba(30,30,30,1)",
  },
  specsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "2rem",
  },
  detailsColor: {
    color: grey[500],
    fontWeight: 400,
  },
  fontColor: {
    color: grey[500],
    fontWeight: 500,
    fontSize: "1.1rem",
  },
});

export default function Details({ details }) {
  const classes = useStyles();
  return (
    <div className={classes.center}>
      <Container>
        <Typography className={classes.detailsColor}>DETAILS</Typography>
        <hr className={classes.hr}></hr>
        <div className={classes.specsGrid}>
          <div>
            <Typography className={classes.fontColor}>Humidity:</Typography>
            <Typography variant="h5">{details[0].humidity} %</Typography>
          </div>
          <div>
            <Typography className={classes.fontColor}>Pressure:</Typography>
            <Typography variant="h5">{details[1].pressure} hPa</Typography>
          </div>
          <div>
            <Typography className={classes.fontColor}>Feels like:</Typography>
            <Typography variant="h5">{details[2].feelsLike}&deg;C</Typography>
          </div>
          <div>
            <Typography className={classes.fontColor}>Wind degree: </Typography>
            <Typography variant="h5">{details[3].windDeg}&deg;</Typography>
          </div>
          <div>
            <Typography className={classes.fontColor}>Wind speed:</Typography>
            <Typography variant="h5">{details[4].windSpeed} km/h</Typography>
          </div>
          <div>
            <Typography className={classes.fontColor}>Visibility:</Typography>
            <Typography variant="h5">{details[5].visibility} km</Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}
