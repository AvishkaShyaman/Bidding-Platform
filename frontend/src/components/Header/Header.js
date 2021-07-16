import React, { useContext,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  Button,
  Typography,
  CssBaseline,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';

import vehicleContext from '../../context/VehicleContext/vehicle-context';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    marginLeft: '100px !important',
    cursor: 'pointer',
    textDecoration: 'none',
    letterSpacing: 6,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  // btn : {
  //   borderBottom: '3px solid #ffffff'
  // }
}));

const Header = () => {
  const classes = useStyles();

  const { favVehicles,  getFavVehicle } = useContext(vehicleContext);

  useEffect(() => {
    getFavVehicle('60f168102bb59e4c9890f656');
  }, [])

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h5"
            color="inherit"
            align="left"
            noWrap
            className={classes.toolbarTitle}
            component={Link}
            to="/"
          >
            Vehicle Bidding Platform
          </Typography>

          <Box mr={5}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
          </Box>

          <Box mr={5}>
            <Button
              startIcon={<FavoriteIcon color="secondary" />}
              color="inherit"
              component={Link}
              to="/watchList"
              className={classes.btn}
            >
              Watch List {`(${favVehicles.length})`}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
