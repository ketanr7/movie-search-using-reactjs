import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import defaultImg from '../../assets/default.jpg';

import './movieDetails.scss'
import ExploreMore from './exploreMore'

import { fetchMovieDetails } from './detailsPageSlice'

const MovieDetails = (props) => {
  const dispatch = useDispatch()
  let history = useHistory();

  let id = props.movieId

  useEffect(() => {
    const fetchAll = async () => {
      await dispatch(fetchMovieDetails({ id }));
    };
    fetchAll()
    window.scrollTo(0, 0);
  }, [id]);
  const movieInfo = useSelector((state) => state.movieDetails.movieInfo)
  const actorsInfo = useSelector((state) => state.movieDetails.actorsData)

  return (
    <Row>
      <Col xs={12} className="detailsTopDiv">
        <div className="closeButton" onClick={() => history.push('/')}>
          <div>
            <span class="left">
            </span>
            <span class="right">
            </span>
          </div>
        </div>
        <div className="moviePoster">
          <img src={movieInfo.Poster !== 'N/A' ? movieInfo.Poster:defaultImg} alt={movieInfo.Title}/>
        </div>
        <div className="movieData">
          <h1 className="movieTitle">{movieInfo.Title}</h1>
          <p className="movieDirector">Director by : {movieInfo.Director}</p>
          <div className="basicDetails"><span>{movieInfo.Runtime}</span><span>{movieInfo.Genre}</span><span>{movieInfo.Language}</span></div>
        </div>
        <div className="detailsRating">
          <div><span>{movieInfo.imdbRating}</span><span>/10</span><p>IMDB</p></div>
          <div><span>{movieInfo.imdbRating}</span><span>/10</span><p>Rotten Tomato</p></div>
        </div>
      </Col>
      <Col xs={12} className="plotContainer">
        <Row>
          <Col xs={3} md={2} className="heading">Plot :</Col>
          <Col xs={9} md={9} className="plotInfo">{movieInfo.Plot}</Col>
        </Row>
      </Col>
      <Col md={12} className="crewContainer">
        <Row>
          <Col xs={3} md={2} className="heading">Crew :</Col>
          <Col xs={9} md={9}>
            <Row className="crewInfo">
              <Col md={4}>
                <p>Dircected by:</p>
                <h5>{movieInfo.Director}</h5>
              </Col>
              <Col md={4} className="Writer"><p>Writer</p>
                <h5>{movieInfo.Writer}</h5></Col>
              {
                actorsInfo.map((actor, index) =>
                (
                  <Col md={4} key={index}><p>Actor</p>
                    <h5>{actor}</h5>
                  </Col>
                ))}
            </Row>
          </Col>
          <Col xs={3}></Col>
        </Row>
      </Col>
      <Col xs={12} className="exploreMoviesContainer">
        <h1>Explore more movies</h1>
        <ExploreMore />
      </Col>
    </Row>
  )
}

export default MovieDetails