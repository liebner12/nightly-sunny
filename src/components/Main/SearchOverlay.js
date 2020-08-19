import React, { useRef, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles({
  overlay: {
    display: "grid",
    placeContent: "center",
    position: "fixed",
    padding: "2rem",
    left: "5%",
    width: "90%",
    background: "rgba(30,30,30,0.8)",
    backdropFilter: "blur(100px)",
    top: 0,
    borderRadius: "10px",
    transform: "translateY(-100%)",
  },
  textfield: {
    margin: "1rem 0",
    width: "100%",
  },
  button: {
    margin: "1rem 0",
    textDecoration: "none",
  },
  overlayOpen: {
    animation: `$slide 0.2s`,
    animationFillMode: "forwards",
  },
  "@keyframes slide": {
    "0%": {
      transform: "translateY(-100%)",
    },
    "100%": {
      transform: "translateY(40%)",
    },
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SearchOverlay(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.handleSearchOpen(false);
          if (props.navbarValue === "favorites") {
            props.handleNavClick("favorites");
          } else if (props.navbarValue === "favorites") {
            props.handleNavClick("favorites");
          }
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleClick = () => {
    if (props.error === true) {
      setOpen(true);
    } else {
      props.handleSearchOpen(false);
      props.handleNavClick(0);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container
      className={`${classes.overlay} ${
        props.openSearch === false ? null : classes.overlayOpen
      }`}
      ref={props.openSearch ? wrapperRef : null}
    >
      <form onSubmit={props.loadWeather} autoComplete="off">
        <TextField
          label="town"
          variant="outlined"
          className={classes.textfield}
          name="town"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          startIcon={<SearchIcon />}
          type="submit"
          onClick={handleClick}
        >
          Search
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Wrong town name!
        </Alert>
      </Snackbar>
    </Container>
  );
}
