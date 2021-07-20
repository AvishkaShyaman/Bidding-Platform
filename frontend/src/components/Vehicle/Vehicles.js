import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  Select,
  Button,
  FormControl,
  InputLabel,
  Typography,
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
    marginTop: theme.spacing(2),
  },
  btn: {
    margin: theme.spacing(2),
  },
}));

const Vehicle = () => {
  const classes = useStyles();
  const { vehicles, getVehicle, vehicleSortBy, filtered } =
    useContext(vehicleContext);

  const [year, setYear] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    getVehicle();
  }, []);

  const colors = ['red', 'blue', 'green'];
  const years = [];
  for (let i = 1998; i <= 2021; i++) {
    years.push(i);
  }

  const handleYearChange = (event) => {
    const value = event.target.value;
    setYear(value);
    console.log('first year');
    vehicleSortBy({ year: value });
  };

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
    vehicleSortBy({ color: value });
  };

  const onClickClear = () => {
    getVehicle();
    setYear('');
    setColor('');
  };
  return (
    <>
      <Grid
        container
        spacing={1}
        className={classes.title}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item lg={5} md={6} sm={12} xs={12}>
          <Search />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          item
          lg={4}
          md={6}
          sm={12}
          xs={12}
        >
          <Grid item sm={4} xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">year</InputLabel>
              <Select
                native
                onChange={handleYearChange}
                value={year}
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

          <Grid item sm={4} xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Color
              </InputLabel>
              <Select
                native
                onChange={handleColorChange}
                value={color}
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
          <Grid
            item
            sm={3}
            xs={12}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button onClick={onClickClear} variant="contained" color="primary">
              Clear
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {vehicles ? (
        <Grid
          container
          spacing={4}
          className={classes.contentList}
          justifyContent="space-evenly"
          alignItems="center"
        >
          {filtered
            ? filtered.map((vehicle) => (
                <Grid key={vehicle._id} item lg={3} md={4} sm={6} xl={12}>
                  <VehicleCard vehicle={vehicle} />
                </Grid>
              ))
            : vehicles.map((vehicle) => (
                <Grid key={vehicle._id} item lg={3} md={4} sm={6} xl={12}>
                  <VehicleCard vehicle={vehicle} />
                </Grid>
              ))}
        </Grid>
      ) : (
        <Grid
          container
          spacing={4}
          className={classes.contentList}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Typography variant="h5" gutterBottom>
            Loading...
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default Vehicle;
