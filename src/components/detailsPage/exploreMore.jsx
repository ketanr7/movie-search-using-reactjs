import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Row } from 'react-bootstrap';
import { exploreMoreMovies } from './detailsPageSlice'
import defaultImg from '../../assets/default.jpg';

import '../homePage/movieCards.scss'

const ExploreMore = (props) => {
  const exploreData = useSelector((state) => state.movieDetails.movieInfo)
  const dispatch = useDispatch()
  let title = "horror"
  let year = exploreData.Year
  useEffect(() => {
    dispatch(exploreMoreMovies({ title, year }))
  }, []);

  const moreMovies = useSelector((state) => state.movieDetails.exploreMoreMovies)

  const cardData = moreMovies.slice(0, 3).map((card, index) => {

    return (
      <Col xl={4} lg={6} md={6} key={index + card.imdbID}>
        <Card className="box"  >
          <Link to={`/details/${card.imdbID}`}>
            <Card.Body>
              <div className="cardDiv">
                <div><img src={card.Poster !== 'N/A' ? card.Poster:defaultImg} alt={card.Title}/></div>
                <div className="extraDetails">
                  <Card.Title>{card.Title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <div>
                      <p>Type</p>
                      <p>{card.Type}</p>
                    </div>
                    <div>
                      <p>Year</p>
                      <p>{card.Year}</p>
                    </div>
                  </Card.Subtitle>
                  <Card.Text>more</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Link>
        </Card>
      </Col>
    )
  })

  return <Row className="cardContainer">{cardData}</Row>








}

export default ExploreMore