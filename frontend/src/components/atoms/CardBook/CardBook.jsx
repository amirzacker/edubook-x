import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import './CardBook.css';

const CardBook = ({ title, price, image }) => {
  return (
    <div className="card-library">
      <div className="card">
        <Card>
          <CardMedia
            component="img"
            width="200"
            height="300"
            image={image}
            alt="Image de la carte"
          />
          <CardContent>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
              Prix : {price} €
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary">
              Ajouter au panier
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default CardBook;
