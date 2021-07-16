import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import VehicleCard from '../Vehicle/VehicleCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  title: {
    marginTop: theme.spacing(10),
  },
  contentList: {
    marginTop: theme.spacing(2),
  },
}));

const Bidding = (props) => {
  const classes = useStyles();

  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/vehicle/' + props.match.params.id)
      .then((res) => {
        setVehicle({ ...res.data.data.vehicle });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!vehicle) {
    return (
      <div>
        <Grid
          container
          spacing={1}
          className={classes.title}
          justify="center"
          alignItems="center"
        >
          <Typography align="center" variant="h4" gutterBottom>
            Loading...
          </Typography>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      <Grid
        container
        spacing={1}
        className={classes.title}
        justify="center"
        alignItems="center"
      >
        <Typography align="center" variant="h4" gutterBottom>
          {`${vehicle.year} ${vehicle.manufacturer} ${vehicle.model}`}
        </Typography>
      </Grid>

      <Grid
        container
        spacing={3}
        className={classes.contentList}
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item lg={3} sm={12}>
          <VehicleCard vehicle={vehicle} />
        </Grid>
        <Grid
          item
          lg={9}
          sm={12}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Typography align="center" variant="h3" gutterBottom>
            Add a new Bit
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Bidding Amount"
              variant="outlined"
            />

            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Bidding;
