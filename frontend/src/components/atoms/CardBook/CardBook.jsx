import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import livre1 from './livre1.jpg';
import './CardBook.css';

const CardBook = () =>{
    return (
    <div className="card-library">
        <div className="card">
            <Card>
                <CardMedia
                    component="img"
                    width="300"
                    height="300"
                    image= { livre1 } // URL de l'image
                    alt="Image de la carte"
                />
                <CardContent>
                    <Typography variant="h6">Titre de la carte</Typography>
                    <Typography variant="body2" color="textSecondary">
                    Description ou contenu de la carte.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

export default CardBook;