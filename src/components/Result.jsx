import React from 'react';

import {Grid, Button} from '@mui/material';

import ImageCard from './ImageCard';
import AutoHideAlert from './AutoHideAlert';

const Result = ({resultData, searched, handleLoadMore, endOfData, page}) => {
  return (
    <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3}}>
      {
        resultData.length === 0 && searched && (
          <Grid item xs={12}>
            <AutoHideAlert
              type='warning'
              delayMs={6000}
              title='Sorry, there are not photos for current search query'
              body='Please, try another one queries combination'
            />
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
      {resultData.length > 0 && !endOfData && (
        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={handleLoadMore}>Load more</Button>
        </Grid>
      )}
      {endOfData && page > 1 && (
        <Grid item xs={12}>
          <AutoHideAlert
            type='warning'
            delayMs={6000}
            title="That's all"
          />
        </Grid>
      )}
    </Grid>
  );
}

export default Result;
