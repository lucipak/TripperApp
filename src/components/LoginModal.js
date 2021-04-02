import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4fc3f7',
    },
    secondary: {
      main: '#81c784',
    },
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 450,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function LoginModal({ setLogin, trip, setTrip }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(true);
  const [create, setCreate] = useState(false);
  const [signin, setSignin] = useState(false);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {!signin && !create ? (
            <div>
              <h2 id="simple-modal-title">Welcome to Tripper!</h2>
              <p id="simple-modal-description">
                If you're new here, let's create an account! Otherwise, welcome
                back!
              </p>
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
              >
                <Button onClick={() => setCreate(true)}>Create Account</Button>
                <Button onClick={() => setSignin(true)}>Login</Button>
              </ButtonGroup>
            </div>
          ) : !signin && create ? (
            <div>
              <h2 id="simple-modal-title">Create account</h2>
              <form
                noValidate
                autoComplete="off"
                style={{
                  display: 'flex-wrap',
                  justifyContent: 'space-between',
                }}
              >
                <TextField required id="standard-basic" label="First Name" />
                <TextField required id="standard-basic" label="Last Name" />
                <TextField
                  onChange={(e) =>
                    setTrip({ ...trip, username: e.target.value })
                  }
                  required
                  id="standard-basic"
                  label="Username"
                />
                <TextField
                  id="standard-basic"
                  type="password"
                  label="Password"
                  required
                />
                <TextField required id="standard-basic" label="Email" />
                <ButtonGroup
                  variant="text"
                  color="primary"
                  aria-label="text primary button group"
                  style={{ marginTop: '15px' }}
                >
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setLogin(true);
                    }}
                  >
                    Let's go!
                  </Button>
                </ButtonGroup>
              </form>
            </div>
          ) : (
            <div>
              <h2 id="simple-modal-title">Sign in</h2>
              <form
                noValidate
                autoComplete="off"
                style={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <TextField
                  onChange={(e) => {
                    setTrip({ ...trip, username: e.target.value });
                  }}
                  required
                  id="standard-basic"
                  label="Username"
                />
                <TextField
                  required
                  id="standard-basic"
                  type="password"
                  label="Password"
                />
                <ButtonGroup
                  variant="text"
                  color="primary"
                  aria-label="text primary button group"
                >
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setLogin(true);
                    }}
                  >
                    Let's go!
                  </Button>
                </ButtonGroup>
              </form>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
