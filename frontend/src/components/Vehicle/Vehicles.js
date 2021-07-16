import React, {useContext, useEffect} from 'react';
import {
  Grid,
  Select,
  Typography,
  Button,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Search from '../layouts/Search';
import VehicleCard from './VehicleCard';
import vehicleContext from '../../context/VehicleContext/vehicle-context';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
    minWidth: 120,
  },
  title: {
    marginTop: theme.spacing(10),
  },
  contentList: {
    marginTop: theme.spacing(2)
  }
}));

const Vehicle = () => {
  const classes = useStyles();
  const { vehicles,  getVehicle } = useContext(vehicleContext);

  useEffect(() => {
    getVehicle();
  }, []);

  const colors = ['red', 'blue', 'green'];
  const years = [];
  for (let i = 1998; i <= 2021; i++) {
    years.push(i);
  }

  const handleChange = (event) => {
    const name = event.target.value;
  };
  return (
    <>
      <Grid
        container
        spacing={1}
        className={classes.title}
        justify="space-between"
        alignItems="center"
      >
        <Grid item lg={5}>
          <Search />
        </Grid>
        <Grid container spacing={1} item lg={4}>
          <Grid item lg={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">year</InputLabel>
              <Select
                native
                onChange={handleChange}
                value={''}
                label="year"
                inputProps={{
                  name: 'Category',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={'All'}>All</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Color
              </InputLabel>
              <Select
                native
                onChange={handleChange}
                value={''}
                label="year"
                inputProps={{
                  name: 'Category',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={'All'}>All</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={4}
        className={classes.contentList}
        justify="space-evenly"
        alignItems="center"
      >
        {vehicles.map((vehicle) => (
          <Grid key={vehicle._id} item lg={3} md={4} sm={6} xl={12}>
            <VehicleCard vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Vehicle;
