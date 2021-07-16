import React from 'react';
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
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function VehicleCard( {vehicle} ) {
  const classes = useStyles();

  const history = useHistory();

  const onClicked = id => {
    console.log('clicked me');
    history.push("/bidding/"+vehicle._id)
  }

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
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2">
            color
          </Typography>
          <IconButton aria-label="favori">
            <FavoriteIcon />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
}
