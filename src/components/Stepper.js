import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DatePicker from './DatePicker';
import { useQuery, gql } from '@apollo/client';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const destinationQuery = gql`
  {
    destinations {
      flights {
        cost
        time
        stops
      }
      hotels {
        name
        address
        rating
        costPerNight
      }
      activities {
        name
        description
        duration
        bookingNeeded
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'white',
  },
  destination: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
    backgroundColor: 'white',
  },
}));

const getSteps = () => {
  return [
    'Choose Destination',
    'Pick Some Dates',
    'Choose Flight',
    'Want a Hotel',
    'Most Popular Activites in the Area',
  ];
};

const VerticalLinearStepper = ({
  handleBook,
  handleSave,
  handleClose,
  saveTrip,
  trip,
  setTrip,
}) => {
  const classes = useStyles();
  const { data } = useQuery(destinationQuery);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        style={{ backgroundColor: 'white' }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography component={'span'}>
                {index === 0 ? (
                  <form
                    className={classes.destination}
                    noValidate
                    autoComplete="off"
                    // style={{ backgroundColor: 'lightgrey' }}
                  >
                    <TextField
                      id="filled-basic"
                      label="Destination"
                      variant="filled"
                      onChange={(e) =>
                        setTrip({ ...trip, destination: e.target.value })
                      }
                    />
                  </form>
                ) : index === 1 ? (
                  <DatePicker trip={trip} setTrip={setTrip} />
                ) : index === 2 ? (
                  <div>
                    These flights match your dates
                    <FlightStep data={data} trip={trip} setTrip={setTrip} />
                  </div>
                ) : index === 3 ? (
                  <div>
                    Here are the top hotels in the area
                    <HotelStep data={data} trip={trip} setTrip={setTrip} />
                  </div>
                ) : (
                  <div>
                    Choose an activity
                    <br />
                    <ActivityStep data={data} trip={trip} setTrip={setTrip} />
                  </div>
                )}
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography component={'div'}>
            You're all set- want us to book your trip?
          </Typography>
          <Button
            onClick={() => {
              handleBook();
              handleClose();
            }}
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Book
          </Button>
          <Button
            onClick={() => {
              handleSave();
              handleClose();
            }}
            className={classes.button}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              handleReset();
              handleClose();
            }}
            className={classes.button}
          >
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default VerticalLinearStepper;

const FlightStep = ({ data, trip, setTrip }) => {
  const { destinations } = data;
  const handleChange = (e) => {
    setTrip({ ...trip, flightTime: e.target.value });
  };

  return trip.destination === 'Copenhagen' ? (
    <FormControl component="fieldset">
      <FormLabel component="legend">Choose one</FormLabel>
      <RadioGroup aria-label="flight" name="flight" onChange={handleChange}>
        {destinations[0].flights.map((flight) => (
          <div key={flight.cost}>
            <FormControlLabel
              value={flight.time}
              label={flight.cost}
              control={<Radio />}
            />
            <div style={{ fontSize: '10px' }}>
              Departure time: {flight.time}
            </div>
            <div style={{ fontSize: '10px' }}>Layovers: {flight.stops}</div>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  ) : (
    <FormControl component="fieldset">
      <FormLabel component="legend">Choose one</FormLabel>
      <RadioGroup aria-label="flight" name="flight" onChange={handleChange}>
        {destinations[1].flights.map((flight) => (
          <div key={flight.cost}>
            <FormControlLabel
              value={flight.time}
              label={flight.cost}
              control={<Radio />}
            />
            <div style={{ fontSize: '10px' }}>
              Departure time: {flight.time}
            </div>
            <div style={{ fontSize: '10px' }}>Layovers: {flight.stops}</div>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const HotelStep = ({ data, trip, setTrip }) => {
  const { destinations } = data;
  console.log(trip.name);
  const handleChange = (e) => {
    setTrip({ ...trip, hotel: e.target.value });
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Choose one</FormLabel>
      <RadioGroup aria-label="hotel" name="hotel" onChange={handleChange}>
        {trip.destination === 'Copenhagen'
          ? destinations[0].hotels.map((hotel) => (
              <div key={hotel.name}>
                <FormControlLabel
                  value={hotel.name}
                  control={<Radio />}
                  label={hotel.name}
                />
                <div style={{ fontSize: '10px' }}>Address: {hotel.address}</div>
                <div style={{ fontSize: '10px' }}>Rating: {hotel.rating}</div>
                <div style={{ fontSize: '10px' }}>
                  Cost per night: {hotel.costPerNight}
                </div>
              </div>
            ))
          : destinations[1].hotels.map((hotel) => (
              <div key={hotel.name}>
                <FormControlLabel
                  value={hotel.name}
                  control={<Radio />}
                  label={hotel.name}
                />
                <div style={{ fontSize: '10px' }}>Address: {hotel.address}</div>
                <div style={{ fontSize: '10px' }}>Rating: {hotel.rating}</div>
                <div style={{ fontSize: '10px' }}>
                  Cost per night: {hotel.costPerNight}
                </div>
              </div>
            ))}
      </RadioGroup>
    </FormControl>
  );
};

const ActivityStep = ({ data, trip, setTrip }) => {
  const { destinations } = data;
  const handleChange = (e) => {
    setTrip({ ...trip, activity: e.target.value });
  };

  return trip.destination === 'Copenhagen' ? (
    <FormControl component="fieldset">
      <FormLabel component="legend"></FormLabel>
      <RadioGroup
        aria-label="activity"
        name="activity"
        // value={}
        onChange={handleChange}
      >
        {destinations[0].activities.map((activity) => (
          <div key={activity.name}>
            <FormControlLabel
              value={activity.name}
              control={<Radio />}
              label={activity.name}
            />
            <div style={{ fontSize: '10px' }}>
              Description: {activity.description}
            </div>
            <div style={{ fontSize: '10px' }}>
              Recommended duration: {activity.duration}
            </div>
            <div style={{ fontSize: '10px' }}>
              Reservation required: {activity.bookingNeeded}
            </div>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  ) : (
    <FormControl component="fieldset">
      <FormLabel component="legend"></FormLabel>
      <RadioGroup
        aria-label="activity"
        name="activity"
        // value={}
        onChange={handleChange}
      >
        {destinations[1].activities.map((activity) => (
          <div key={activity.name}>
            <FormControlLabel
              value={activity.name}
              control={<Radio />}
              label={activity.name}
            />
            <div style={{ fontSize: '10px' }}>
              Description: {activity.description}
            </div>
            <div style={{ fontSize: '10px' }}>
              Recommended duration: {activity.duration}
            </div>
            <div style={{ fontSize: '10px' }}>
              Reservation required: {activity.bookingNeeded}
            </div>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

// GetSteContent(index)}
