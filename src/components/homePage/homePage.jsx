import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from './Slider';
import SearchMovie from './searchMovie';

import './homePage.scss';

const HomePage = () => {

  return (<Container fluid className="MainContainer">
    <Row>
      <Col xs={12}>
        <Slider />
      </Col>
      <Col xs={12} className="explore">
        <h1>Explore more movies</h1>
        <SearchMovie />
      </Col>
    </Row>
  </Container>
  )
};

export default HomePage;
