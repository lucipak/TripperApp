import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxHeight: '75%',
    overflowY: 'scroll',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.text.secondary,
    alignSelf: 'center',
    marginLeft: '5px',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function TripLists({
  handleUpdate,
  trip,
  userTrips,
  value,
  handleDeletion,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { data } = userTrips;
  return value === 0 ? (
    <div className={classes.root}>
      {data.trips.map((tile, idx) =>
        trip.username === tile.username && tile.saved === 'false' ? (
          <Accordion
            key={idx}
            expanded={expanded === `panel${idx + 1}`}
            onChange={handleChange(`panel${idx + 1}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                {tile.destination}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                <div>Dates:</div>
                {tile.departuredate} - {tile.returndate}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Typography style={{ fontSize: '12px' }}>
                <strong>Departure time:</strong> {tile.flighttime}
              </Typography>
              <Typography style={{ fontSize: '12px' }}>
                <strong>Hotel: </strong>
                {tile.hotel}
              </Typography>
              <Typography style={{ fontSize: '12px' }}>
                <strong>Planned activity:</strong> {tile.activity}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDeletion(tile)}
                className={classes.button}
              >
                Delete
              </Button>
            </AccordionDetails>
          </Accordion>
        ) : null
      )}
    </div>
  ) : (
    <div className={classes.root}>
      {data.trips.map((tile, idx) =>
        trip.username === tile.username && tile.saved === 'true' ? (
          <Accordion
            key={idx}
            expanded={expanded === `panel${idx + 15}`}
            onChange={handleChange(`panel${idx + 15}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                className={classes.heading}
                style={{ alignSelf: 'center' }}
              >
                {tile.destination}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                <div>Dates:</div>
                {tile.departuredate} - {tile.returndate}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Typography style={{ fontSize: '12px' }}>
                <strong>Departure time:</strong> {tile.flighttime}
              </Typography>
              <Typography style={{ fontSize: '12px' }}>
                <strong>Hotel: </strong>
                {tile.hotel}
              </Typography>
              <Typography style={{ fontSize: '12px' }}>
                <strong>Planned activity:</strong> {tile.activity}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdate(tile)}
                className={classes.button}
              >
                Book
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDeletion(tile)}
                className={classes.button}
              >
                Delete
              </Button>
            </AccordionDetails>
          </Accordion>
        ) : null
      )}
    </div>
  );
}
