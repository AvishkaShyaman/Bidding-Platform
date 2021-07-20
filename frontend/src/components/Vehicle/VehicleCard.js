import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import vehicleContext from '../../context/VehicleContext/vehicle-context';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function VehicleCard({ vehicle }) {
  const classes = useStyles();

  const history = useHistory();

  const [fav, setFav] = useState(false);

  const { favVehicles,getFavVehicle, AddVehicleToFav, RemoveVehicleFromFav } = useContext(vehicleContext);

  if (favVehicles && fav === false) {
    if (favVehicles.filter((e) => e._id === vehicle._id).length > 0) {
      setFav(true);
      console.log('in if true');
    }
    console.log('in if');
  }

  const onClicked = (id) => {
    history.push('/bidding/' + vehicle._id);
  };

  const onFavClicked = (id) => {
    console.log('clicked me');

    if(fav) {
      RemoveVehicleFromFav({vehicle, userID:'60f168102bb59e4c9890f656'});
      getFavVehicle();
      setFav(false);
    } else {
      AddVehicleToFav({vehicle, userID:'60f168102bb59e4c9890f656'});
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClicked}>
        <CardMedia
          className={classes.media}
          image="https://www.vega.lk/img/evx/ws6.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${vehicle.year} ${vehicle.manufacturer} ${vehicle.model}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {vehicle.description}
          </Typography>
          <Typography variant="h6" component="p">
            Hiest bid: ${vehicle.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2">color</Typography>
          <IconButton aria-label="favori" onClick={onFavClicked}>
            <FavoriteIcon color={fav ? 'secondary' : 'inherit'} />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
}
