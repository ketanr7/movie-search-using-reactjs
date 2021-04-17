import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Row } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMoviesForCards } from './homePageSlice'
import defaultImg from '../../assets/default.jpg';

import './movieCards.scss'

const MovieCards = (props) => {
  const dispatch = useDispatch()

  const title = props.title

  const [year, setYear] = useState('');
  const [id, setId] = useState('');
  const [page, setPage] = useState(1);

  const cards = useSelector((state) => state.movies.movieCollection)
  const hasMore = useSelector((state) => state.movies.hasMore)

  useEffect(() => {
    dispatch(getMoviesForCards({ title, year, id, page }))
  }, []);

  const fetchMovies = () => {
    setPage(page + 1);
    if (hasMore) {
      dispatch(getMoviesForCards({ title, year, id, page }))
    }
  };

  const cardDetails =
  (cards ?
    <InfiniteScroll
      dataLength={cards.length}
      next={fetchMovies}
      hasMore={hasMore}
      loader={hasMore !=false ?<h4 className="cardLoader">Loading...</h4>:null}
    >{
        <Row>{
          cards.map((card, index) =>
          (
            <Col xl={4} lg={6} md={6} key={index + card.imdbID}>
              <Card className="box"  >
                <Link to={`/details/${card.imdbID}`}>
                  <Card.Body>
                    <div className="cardDiv">
                      <div><img src={card.Poster != 'N/A' ? card.Poster:defaultImg} /></div>
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
          )
        }</Row>
      }
    </InfiniteScroll> : <h3>No Record</h3>
  )

  return <Row className="cardContainer" >{cardDetails}</Row>
}

export default MovieCards