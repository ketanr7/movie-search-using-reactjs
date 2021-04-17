import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Carousel, Button } from 'react-bootstrap';
import './slider.scss'

const Slider = () => {
  const favMovies = useSelector((state) => state.movies.moviesData)

  const renderedListItems = favMovies.map((movie) => {
    return (
      <Carousel.Item key={movie.imdbID} className="slider">
        <img
          className="d-block w-100"
          src={movie.Poster}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="movieTitle">{movie.Title}<span className="movieYear">({movie.Year})</span></h3>
          <p className="movieDirector">Director by : {movie.Director}</p>
          <div className="flex-container">
            <div className="ratingFlex"><p><span className="imdbRating">{movie.imdbRating}</span> <span>/10</span></p><p>IMDB</p></div>
            <div className="movieDescription"><p >{((movie.Plot).substring(0, 125)) + '. . . .'}</p>  <Link to={`/details/${movie.imdbID}`}><Button variant="outline-primary">Know More</Button></Link></div>
          </div>
          <div className="basicDetails"><span>{movie.Runtime}</span><span>{movie.Genre}</span><span>{movie.Language}</span></div>
        </Carousel.Caption>
      </Carousel.Item>
    )
  });
  return <Carousel fade className="sliderContainer">{renderedListItems}</Carousel>
}

export default Slider