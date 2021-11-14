import React from 'react';

import {Typography, CardContent, Card, Divider} from '@mui/material';

const RoverInfoCard = ({manifest}) => {
  if (Object.keys(manifest).length !== 0) {
    return (
      <Card
        sx={{
          height: '100%'
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" mb={2}>
            {manifest.name}
          </Typography>
          <Divider/>
          <Typography variant="body2" color="text.secondary" mt={2} mb={1}>
            Rover was landing on Mars at {manifest.landing_date}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Rover's mission is {manifest.status}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Already take {manifest.total_photos} photos
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Last send photo is dated at {manifest.max_sol} sol <br/> (it's {manifest.max_date} on Earth)
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: '100%'
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" mb={2}>
          Rover info will be here
        </Typography>
        <Divider/>
        <Typography variant="body2" color="text.secondary" mt={2} mb={1}>
          Please select some rover
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RoverInfoCard;
