import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Button from "@material-ui/core/Button";
import Details from "./Details";
import List from "./List";
import Hourly from "./Hourly";
import Hidden from "@material-ui/core/Hidden";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchDesktop from "./SearchDesktop";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  textContainer: {
    minHeight: "80vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "80px",
  },
  section: {
    marginBottom: "100px",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1rem 0",
  },
  cityText: {
    display: "flex",
    alignItems: "center",
  },
  desktopView: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  button: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)",
    "&:visited": {
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
  tempToday: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
});

export default function WeatherLayout(props) {
  const classes = useStyles();
  const handleClick = () => {
    props.handleNavClick("favorites");
  };
  return (
    <div>
      <div className={classes.textContainer}>
        <Container>
          <div className={classes.nav}>
            <div className={classes.cityText}>
              <LocationOnOutlinedIcon /> &nbsp;
              <Typography variant="h6"> {props.city}</Typography>
            </div>
            <Link className={classes.button} to="/favorites">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                size="large"
                startIcon={<FavoriteIcon />}
                onClick={handleClick}
              >
                Favorites
              </Button>
            </Link>
          </div>
        </Container>
        <div>
          <Container className={classes.desktopView}>
            <div className={classes.tempToday}>
              <Typography variant="h1">{props.temp}&deg;</Typography>
              <Typography variant="h6">
                <FontAwesomeIcon
                  icon={props.weatherIcon(props.weatherId)}
                  className={classes.icon}
                />
                &nbsp;
                {props.weatherType}
                <br />
                <div className={classes.cityText}>
                  <ArrowUpwardIcon /> {props.tempMax}&deg;C &nbsp;
                  <ArrowDownwardIcon /> {props.tempMin}&deg;C
                </div>
              </Typography>
            </div>
            <Hidden xsDown>
              <SearchDesktop loadWeather={props.loadWeather} />
            </Hidden>
          </Container>
          <div>
            <Hourly
              tempHourly={props.tempHourly}
              weatherIcon={props.weatherIcon}
            />
          </div>
        </div>
      </div>
      <section className={classes.section}>
        <List
          tempNextDays={props.tempNextDays}
          weatherIcon={props.weatherIcon}
        />
        <Details details={props.details} />
      </section>
    </div>
  );
}
