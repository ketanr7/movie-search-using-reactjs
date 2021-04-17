import axios from "axios";

const initialState = {
  movieInfo: [],
  exploreMoreMovies: [],
  actorsData: []
}

export default function movieDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case 'fetchMovieDetails': {
      const actorName = (action.payload.Actors).toString().split(',')
      return {
        ...state,
        movieInfo: action.payload,
        actorsData: actorName
      };
    }
    case 'exploreMoreMovies': {
      return {
        ...state,
        exploreMoreMovies: action.payload
      };
    }
    default:
      return state
  }
}

// Thunk function

export function fetchMovieDetails({ id }) {
  return async function fetchMovieDetailsThunk(dispatch, getState) {
    const params = { i: id }
    const response = await axios.get('http://www.omdbapi.com/?apikey=3b9f341f', { params: params })
    dispatch({ type: 'fetchMovieDetails', payload: response.data })
  }
}

export function exploreMoreMovies({ title, year }) {
  return async function exploreMoreMoviesThunk(dispatch, getState) {
    const params = { s: title, y: year }
    const response = await axios.get('http://www.omdbapi.com/?apikey=3b9f341f', { params: params })
    dispatch({ type: 'exploreMoreMovies', payload: response.data.Search })
  }
}


