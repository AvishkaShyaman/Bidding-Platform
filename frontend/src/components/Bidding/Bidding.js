import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import VehicleCard from '../Vehicle/VehicleCard';

const useStyles = makeStyles((theme) => ({
  rightSide: {
    width: '100%',
  },
  rootForm: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '90%',
    },
  },
  title: {
    marginTop: theme.spacing(10),
  },
  contentList: {
    marginTop: theme.spacing(2),
  },
  contentHistory: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  btnAdd: {
    width: '30%',
  },
  table: {
    minWidth: 650,
  },
}));

const Bidding = (props) => {
  const classes = useStyles();

  const [vehicle, setVehicle] = useState(null);
  const [amount, setAmount] = useState(undefined);
  const [maxAmount, setMaxAmount] = useState(0);
  const [rows, setRows] = useState([]);

  //   const rows = [
  //     {amount:545412121,date:'21/05/2021'},
  // ];

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/vehicle/' + props.match.params.id)
      .then((res) => {
        setVehicle({ ...res.data.data.vehicle });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `http://localhost:5000/api/v1/bidding/biddings?vehicleId=${props.match.params.id}`
      )
      .then((res) => {
        setRows(res.data.data.bidding);

        console.log('rows', rows.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onAmmountSubmited = (e) => {
    e.preventDefault();

    console.log('hit me', amount);
    axios
      .post('http://localhost:5000/api/v1/bidding', {
        amount,
        user: '60f168102bb59e4c9890f656',
        vehicleID: props.match.params.id,
      })
      .then((res) => {
        console.log('added', res.data.data.bidding);
        setAmount('');
        console.log('hit me', res.data.data.bidding);
        rows.unshift(res.data.data.bidding);
        setRows([...rows]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAmmountFieldChanged = (e) => {
    setAmount(e.target.value);
  };

  if (rows.length && maxAmount === 0) {
    let max = 0;

    rows.forEach((row) => {
      if (row.user == '60f168102bb59e4c9890f656' && row.amount > max) {
        max = row.amount;
        console.log('max', max);
      }
      setMaxAmount(max);
    });
  }

  if (!vehicle) {
    return (
      <div>
        <Grid
          container
          spacing={1}
          className={classes.title}
          justifyContent="center"
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
        justifyContent="center"
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
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <Grid
          item
          lg={3}
          sm={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <VehicleCard vehicle={vehicle} />
        </Grid>
        <Grid
          item
          lg={9}
          sm={12}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation={3} className={classes.rightSide}>
            {rows.length ? (
              <Typography
                className={classes.contentList}
                align="center"
                variant="h6"
                gutterBottom
              >
                Your current Max Bit ${maxAmount}{' '}
                {maxAmount > rows[0].amount
                  ? '(Your the highest bidder)'
                  : '(Your not the highest bidder)'}
              </Typography>
            ) : (
              <Typography
                className={classes.contentList}
                align="center"
                variant="h6"
                gutterBottom
              >
                Loading...
              </Typography>
            )}

            <Typography
              className={classes.contentList}
              align="center"
              variant="h4"
              gutterBottom
            >
              Add a new Bid Ammount
            </Typography>
            <form
              className={classes.rootForm}
              onSubmit={onAmmountSubmited}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Bidding Amount"
                type="number"
                variant="outlined"
                value={amount}
                onChange={onAmmountFieldChanged}
              />

              <Button
                className={classes.btnAdd}
                type="submit"
                variant="contained"
                color="primary"
              >
                Add
              </Button>
              <Typography align="center" variant="body2" gutterBottom>
                Your new bid should be higher than your current max bid
              </Typography>
            </form>
          </Paper>
          <Paper
            elevation={3}
            className={`${classes.rightSide} ${classes.contentHistory}`}
          >
            <Typography
              className={classes.contentList}
              align="left"
              variant="h4"
              gutterBottom
            >
              History
            </Typography>
            {rows.length > 0 ? (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Bid Amount</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          {row.amount}
                        </TableCell>
                        <TableCell>{row.createdAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography
                className={classes.contentList}
                align="left"
                variant="body1"
                gutterBottom
              >
                No any bidding yet
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Bidding;
