import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import VerticalLinearStepper from './Stepper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    transition: 'all 150ms ease-in-out',
    color: 'white',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Popup = ({
  handleBook,
  handleSave,
  trip,
  setTrip,
  saveTrip,
  setUserTrips,
}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 style={{ color: 'black' }} id="simple-modal-title">
        Where do you want to go?
      </h2>
      <VerticalLinearStepper
        handleClose={handleClose}
        saveTrip={saveTrip}
        trip={trip}
        setTrip={setTrip}
        handleSave={handleSave}
        handleBook={handleBook}
      />
    </div>
  );

  return (
    <div>
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <Button
          style={{
            fontSize: '35px',
            paddingLeft: '25px',
            color: 'white',
            paddingBottom: '20px',
          }}
          onClick={handleOpen}
        >
          New Trip
        </Button>
      </ButtonGroup>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default Popup;
