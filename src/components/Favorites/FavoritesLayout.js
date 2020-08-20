import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "../Main/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    marginBottom: "80px",
  },
  button: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)",
    "&:visited": {
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1rem 0",
  },
  fab: {},
  addingSection: {
    display: "flex",
    width: "100%",
  },
  form: {
    flex: "1",
    display: "flex",
  },
  textField: {
    boxSizing: "border-box",
    flex: "1",
    marginLeft: "1rem",
  },
  widget: {
    margin: "1rem 0",
  },
  widgetText: {
    marginBottom: "1rem",
  },
});

export default function FavoritesLayout(props) {
  const classes = useStyles();
  const handleClick = () => {
    props.handleNavClick(0);
  };
  return (
    <div>
      <Container className={classes.container}>
        <div className={classes.topBar}>
          <Typography variant="h6">Favorites</Typography>
          <Link className={classes.button} to="/">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              size="large"
              startIcon={<HomeIcon />}
              onClick={handleClick}
            >
              Home
            </Button>
          </Link>
        </div>
        <div className={classes.addingSection}>
          <form
            onSubmit={props.loadWeather}
            autoComplete="off"
            className={classes.form}
          >
            <Fab
              color="primary"
              aria-label="add"
              type="submit"
              className={classes.fab}
            >
              <AddIcon />
            </Fab>
            <TextField
              className={classes.textField}
              id="filled-basic"
              label="City"
              variant="filled"
              name="town"
            />
          </form>
        </div>
        {props.favList.map((item, id) => (
          <Card key={id} className={classes.widget}>
            <CardContent>
              <div className={classes.widgetText}>
                <Typography variant="h4">{item[0].city}</Typography>
                <Typography variant="h5">
                  {item[0].temp}&deg;C &nbsp;
                  <FontAwesomeIcon
                    icon={props.weatherIcon(item[0].weatherId, item[0].hour)}
                    className={classes.icon}
                  />
                </Typography>
              </div>

              <List
                tempNextDays={item[1].favoritesTempNextDays}
                weatherIcon={props.weatherIcon}
              />
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
}
