import React, {Component} from 'react';

import {Container, Box, Grid, Card, CardContent} from '@mui/material';

import {FetchFromApi} from '../util/FetchFromApi';

import Search from './Search';
import Result from './Result';
import RoverInfoCard from './RoverInfoCard';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoDetails: {
        roverName: '',
        roverCamera: '',
        sol: 0
      },
      resultData: {},
      manifest: {},
      searched: false
    }

    this.apiKey = process.env.REACT_APP_NASA_API_KEY;
  }

  handleManifestGet = manifest => {
    this.setState(() => ({manifest}));
  }

  handleSearch = async event=> {
    event.preventDefault();
    const form = event.target;
    const roverName = form.roverSelect.value;
    const roverCamera = form.cameraSelect.value;
    const sol = form.sol.value;

    const data = await FetchFromApi
      .getPhotosByRoverCameraSol(this.apiKey, roverName, roverCamera, sol);

    this.setState(() => ({
      photoDetails: {
        roverName,
        roverCamera,
        sol,
      },
      resultData: {
        ...data
      },
      searched: true
    }));
  }

  render() {
    const {roverName, roverCamera, sol} = this.state.photoDetails;
    const {resultData, manifest, searched} = this.state;

    return (
      <Container
        sx={{
          padding: '1rem',
          height: '100vh',
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mb={3}>
          <Grid item xs={12} md={6} lg={4}>
            <RoverInfoCard manifest={manifest}/>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Card>
              <CardContent>
                <Search
                  handleSearch={this.handleSearch}
                  handleManifestGet={this.handleManifestGet}
                  searchFields={{roverName, roverCamera, sol}}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box>
          <Result resultData={resultData.photos || []} searched={searched}/>
        </Box>
      </Container>
    );
  }
}

export default App;
