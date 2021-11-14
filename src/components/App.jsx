import React, {Component} from 'react';

import {Container, Box, Grid, Card} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';

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
    this.cardTheme = createTheme({
      palette: {
        mode: 'dark'
      }
    });
  }

  handleManifestGet = manifest => {
    this.setState(() => ({manifest}));
  }

  handleSearch = async event => {
    this.setState(() => ({searched: false}));

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
          bgcolor: 'transparent'
        }}
      >
        <Box mb={3}>
          <Card>
            <Grid container rowSpacing={2} columnSpacing={3}>
              <ThemeProvider theme={this.cardTheme}>
                <Grid item xs={12} md={6} lg={4} minHeight='280px'>
                  <Box sx={{height: '100%', bgcolor: '#101010'}}>
                    <RoverInfoCard manifest={manifest}/>
                  </Box>
                </Grid>
              </ThemeProvider>
              <Grid item xs={12} md={6} lg={8}>
                <Search
                  handleSearch={this.handleSearch}
                  handleManifestGet={this.handleManifestGet}
                  searchFields={{roverName, roverCamera, sol}}
                />
              </Grid>
            </Grid>
          </Card>
        </Box>
        <Box paddingBottom={3}>
          <Result resultData={resultData.photos || []} searched={searched}/>
        </Box>
      </Container>
    );
  }
}

export default App;
