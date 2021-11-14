import React from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';

const ImageCard = ({photo, details}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={photo}
        alt={`Photo from ${details.roverName}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`Photo from ${details.roverName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Photo made by "${details.roverCamera}" at ${details.sol} sol (${details.dateOnEarth} on Earth)`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
