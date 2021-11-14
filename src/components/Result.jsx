import React, {Component} from 'react';

import ImageCard from './ImageCard';

const Result = ({resultData}) => {
  return (
    <div>
      {resultData.map(photo => {
        const photoDetails = {
          roverName: photo.rover.name,
          roverCamera: photo.camera.full_name,
          sol: photo.sol,
          dateOnEarth: photo.earth_date
        }

        console.log(photo)

        return (
          <ImageCard
            key={photo.id}
            photo={photo.img_src}
            details={photoDetails}
          />
        );
      })}
    </div>
  );
}

export default Result;
