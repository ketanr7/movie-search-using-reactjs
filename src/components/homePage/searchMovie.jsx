import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap';
import { getMovies } from './homePageSlice'
import MovieCards from './movieCards';
import './searchMovie.scss'


function SearchMovie() {
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false);
  const [searchData, setSearchData] = useState({
    title: '',
    year: '',
    id: '',
    page: 1
  });

  const { title, year, id, page } = searchData;

  const handleSubmit = async event => {
    event.preventDefault();
    if (title == '' && id == '' ) {
      alert("Please Enter movie title or movie id");
      return;
    }
    dispatch(getMovies({ title, year, id, page }))
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setSearchData({ ...searchData, [name]: value });
  };

  return (
    <div>
      <div className="searchMovieContainer">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Control type="text" placeholder="Search Title" name="title" value={title}
                onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">

              <Form.Control type="text" placeholder="Year" name="year" value={year}
                onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">

              <Form.Control type="text" placeholder="ID" name="id" value={id}
                onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Button type="submit">Search</Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
      <MovieCards title={title == '' && id == '' ? 'sniper' : title} />
    </div>
  );
}

export default SearchMovie;