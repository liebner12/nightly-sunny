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
import { grey } from "@material-ui/core/colors";
import yellow from "@material-ui/core/colors/yellow";
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
  fontWeight: {
    fontWeight: "400",
    color: grey[500],
  },
  hr: {
    border: 0,
    backgroundColor: yellow[500],
    height: "2px",
    margin: "1rem 0",
  },
  listBox: {
    boxSizing: "border-box",
    width: "100%",
    background: "rgba(30,30,30,1)",
    marginBottom: "80px",
    display: "grid",
    alignItems: "center",
    padding: "2rem 0",
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
                  icon={props.weatherIcon(props.weatherId,props.hour)}
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
        <div className={classes.listBox}>
          <Container>
            <Typography className={classes.fontWeight}>NEXT 5 DAYS</Typography>
            <hr className={classes.hr}></hr>
            <List
              tempNextDays={props.tempNextDays}
              weatherIcon={props.weatherIcon}
            />
          </Container>
        </div>
        <Details details={props.details} />
      </section>
    </div>
  );
}
