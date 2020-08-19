import React, { useRef, useEffect } from "react";
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
    padding: "2rem",
    width: "50%",
    height: "100%",
    background: "rgba(30,30,30,1)",
    borderRadius: "10px",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  textfield: {
    margin: "1rem 0",
    width: "100%",
  },

  button: {
    margin: "1rem 0",
    textDecoration: "none",
  },
  buttonSpace: {
    
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SearchDesktop(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.handleSearchOpen(false);
          props.handleNavClick(0);
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
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.overlay} ref={props.openSearch ? wrapperRef : null}>
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
    </div>
  );
}
