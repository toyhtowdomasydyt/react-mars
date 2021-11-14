import React from 'react';

import {Grid} from '@mui/material';

import ImageCard from './ImageCard';

const Result = ({resultData}) => {
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
