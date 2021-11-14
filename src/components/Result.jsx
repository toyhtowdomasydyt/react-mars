import React from 'react';

import {Grid, Card, CardContent, Typography} from '@mui/material';

import ImageCard from './ImageCard';

const Result = ({resultData, searched}) => {
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {
        resultData.length === 0 && searched && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sorry, there are not photos for current search query
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please, try another one queries combination
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )
      }
      {resultData.map(photo => {
        const photoDetails = {
          roverName: photo.rover.name,
          roverCamera: photo.camera.full_name,
          sol: photo.sol,
          dateOnEarth: photo.earth_date
        }

        return (
          <Grid key={photo.id} item xs={12} md={6} lg={4}>
            <ImageCard
              photo={photo.img_src}
              details={photoDetails}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Result;
