import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TripLists from './TripLists';

export default function TripTabs({
  handleUpdate,
  trip,
  userTrips,
  handleDeletion,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ maxHeight: '100%', overflow: 'scroll', width: '450px' }}>
      <Paper
        square
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Upcoming trips" />
          <Tab label="Saved Trips" />
        </Tabs>
      </Paper>
      <div>
        <TripLists
          handleDeletion={handleDeletion}
          trip={trip}
          userTrips={userTrips}
          value={value}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}
