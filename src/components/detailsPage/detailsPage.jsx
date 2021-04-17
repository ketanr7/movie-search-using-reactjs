import React from 'react';
import { useParams } from 'react-router-dom';
import { Container} from 'react-bootstrap';

import MovieDetails from './movieDetails'

const DetailsPage = () => {
  let { movieId } = useParams();

  return (
    <Container fluid className="MainContainer">
      <MovieDetails movieId={movieId} />
    </Container>
  )
}

export default DetailsPage;