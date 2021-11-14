import React from 'react';
import {Card, CardContent, CardMedia, Typography, Divider} from '@mui/material';

const ImageCard = ({photo, details}) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="280"
        image={photo}
        alt={`Photo from ${details.roverName}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`Photo from ${details.roverName}`}
        </Typography>
        <Divider/>
        <Typography variant="body2" color="text.secondary" mt={2} mb={1}>
          Photo made by "{details.roverCamera}"
        </Typography>
        <Typography variant="body2" color="text.secondary">
          At {details.sol} sol ({details.dateOnEarth} on Earth)
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
