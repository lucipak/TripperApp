import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const DatePicker = ({ trip, setTrip }) => {
  const classes = useStyles();
  console.log('TRIP: ', typeof trip.departureDate);

  return (
    <form className={classes.container} noValidate>
      <TextField
        onChange={(e) => {
          setTrip({
            ...trip,
            departureDate: e.target.value.toString(),
          });
        }}
        id="date"
        label="Departure Date"
        type="date"
        defaultValue="yyyy-MM-dd"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        onChange={(e) => {
          setTrip({
            ...trip,
            returnDate: e.target.value.toString(),
          });
        }}
        id="date"
        label="Return Date"
        type="date"
        defaultValue="yyyy-MM-dd"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
};

export default DatePicker;
