import React, {useContext, useEffect} from 'react';
import { Grid,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import vehicleContext from '../../context/VehicleContext/vehicle-context';
import VehicleCard from '../Vehicle/VehicleCard';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(10),
  },
  contentList: {
    marginTop: theme.spacing(2)
  }
}));

const WatchList = () => {
  const classes = useStyles();

  const { favVehicles,  getFavVehicle } = useContext(vehicleContext);

  return (
    <div>
      <Grid container  spacing={1} className={classes.title} justifyContent="center" alignItems="center">
        <Typography align="center" variant="h4" gutterBottom>
          Watch List
        </Typography>
      </Grid>

      <Grid
        container
        spacing={4}
        className={classes.contentList}
        justifyContent="space-evenly"
        alignItems="center"
      >
        {favVehicles.map((vehicle) => (
          <Grid key={vehicle._id} item lg={3} md={4} sm={6} xl={12}>
            <VehicleCard vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WatchList;
