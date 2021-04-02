import '../App.css';
import { useQuery, useMutation, gql } from '@apollo/client';
import Popup from './Popup';
import React, { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import TripTabs from './TripTabs';
import Header from './Header';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#81d4fa',
    },
    secondary: {
      main: '#ccff90',
    },
  },
});

const SAVE_TRIP = gql`
  mutation saveMutation(
    $username: String!
    $departuredate: String!
    $returndate: String!
    $destination: String!
    $flighttime: String!
    $hotel: String!
    $activity: String!
    $saved: String
  ) {
    saveTrip(
      username: $username
      departuredate: $departuredate
      returndate: $returndate
      destination: $destination
      flighttime: $flighttime
      hotel: $hotel
      activity: $activity
      saved: $saved
    ) {
      username
    }
  }
`;
const DELETE_TRIP = gql`
  mutation deleteMutation($username: String!, $destination: String!) {
    deleteTrip(username: $username, destination: $destination) {
      username
    }
  }
`;

const UPDATE_TRIP = gql`
  mutation updateMutation($username: String!, $destination: String!) {
    updateTrip(username: $username, destination: $destination) {
      username
    }
  }
`;

const getSaved = gql`
  {
    trips {
      username
      departuredate
      returndate
      destination
      flighttime
      hotel
      activity
      saved
    }
  }
`;

const App = () => {
  const [trip, setTrip] = useState({
    username: '',
    departureDate: '',
    returnDate: '',
    destination: '',
    flightTime: '',
    hotel: '',
    activity: '',
    saved: '',
  });
  const [saveTrip] = useMutation(SAVE_TRIP, {
    onCompleted: async () => {
      await refetch();
    },
  });

  const [deleteTrip] = useMutation(DELETE_TRIP, {
    onCompleted: async () => {
      await refetch();
    },
  });

  const [updateTrip] = useMutation(UPDATE_TRIP, {
    onCompleted: async () => {
      await refetch();
    },
  });

  const [userTrips, setUserTrips] = useState([]);
  const [login, setLogin] = useState(false);
  const { data, refetch } = useQuery(getSaved);
  useEffect(() => {
    setUserTrips({ data });
  }, [refetch, data]);

  console.log(data);

  const handleSave = () => {
    saveTrip({
      variables: {
        username: trip.username,
        departuredate: trip.departureDate,
        returndate: trip.returnDate,
        destination: trip.destination,
        flighttime: trip.flightTime,
        hotel: trip.hotel,
        activity: trip.activity,
        saved: 'true',
      },
    }).catch((err) => console.log(err));
  };

  const handleBook = () => {
    saveTrip({
      variables: {
        username: trip.username,
        departuredate: trip.departureDate,
        returndate: trip.returnDate,
        destination: trip.destination,
        flighttime: trip.flightTime,
        hotel: trip.hotel,
        activity: trip.activity,
        saved: 'false',
      },
    }).catch((err) => console.log(err));
  };

  const handleDeletion = (props) => {
    deleteTrip({
      variables: {
        username: props.username,
        destination: props.destination,
      },
    }).catch((err) => console.log(err));
  };

  const handleUpdate = (props) => {
    updateTrip({
      variables: {
        username: props.username,
        destination: props.destination,
      },
    }).catch((err) => console.log(err));
  };

  return login ? (
    <ThemeProvider theme={theme}>
      <div>
        <Header login={login} setLogin={setLogin} username={trip.username} />
        <div
          style={{
            justifyItems: 'center',
            display: 'grid',
            gridTemplateRows: 'auto 80%',
            position: 'fixed',
            left: '40%',
            width: '400px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              top: '15%',
            }}
          >
            <h3
              style={{
                fontFamily: 'Helvetica',
                fontSize: '20px',
                marginLeft: '20px',
                marginBottom: '5px',
              }}
            >
              Where are you going next?
            </h3>
            <div
              style={{
                marginLeft: '30px',
              }}
            >
              <Popup
                handleSave={handleSave}
                handleBook={handleBook}
                saveTrip={saveTrip}
                trip={trip}
                setTrip={setTrip}
              />
            </div>
          </div>
          <div style={{ gridRow: '2' }}>
            <TripTabs
              handleDeletion={handleDeletion}
              trip={trip}
              userTrips={userTrips}
              handleUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <Header />
      <LoginModal
        // handleUser={handleUser}
        trip={trip}
        setTrip={setTrip}
        setLogin={setLogin}
      />
    </ThemeProvider>
  );
};

export default App;
