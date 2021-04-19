import axios from "axios";

const initialState = {
  movieIds: ['tt5013056', 'tt0816711','tt0848228'],
  moviesData: [],
  movieCollection: [],
  hasMore: true,
  loading: true,
  title: '',
  id: ''
}


export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case 'getMoviesForCardsData': {
      var setHasMore
      if (action.payload !== undefined) {
        setHasMore = action.payload.length !== 0 ? true : false
      } else {
        setHasMore = false
      }
      return {
        ...state,
        hasMore: setHasMore,
        movieCollection: state.hasMore !== true ? state.movieCollection : state.movieCollection.concat(action.payload)
      };
    }
    case 'getMoviesInfo': {
      state.movieCollection = []
      var setHasMoreValue;
      if (action.payload.id) {
        setHasMoreValue = false
      } else {
        setHasMoreValue = true
      }
      return {
        ...state,
        movieCollection: action.payload.payload,
        title: action.payload.title,
        id: action.payload.id,
        hasMore: setHasMoreValue
      };
    }
    case 'fetchMoviesData': {
      return {
        ...state,
        moviesData: action.payload,
        loading: false
      };
    }
    default:
      return state
  }
}

// Thunk function
export async function fetchMovies(dispatch, getState) {
  const movieId = getState().movies.movieIds
  const data = await Promise.all(movieId.map(movie => axios.get(`http://www.omdbapi.com/?apikey=3b9f341f&i=${movie}`)
    .then(response => response.data)
  ))
  dispatch({ type: 'fetchMoviesData', payload: data })
}

export function getMoviesForCards({ title, year, id, page }) {
  return async function getMoviesForCardsThunk(dispatch, getState) {
    const params = { s: title, y: year, i: id, page: page }
    const response = await axios.get('http://www.omdbapi.com/?apikey=3b9f341f', { params: params })
    if (response.data.Response !== 'False') {
      dispatch({ type: 'getMoviesForCardsData', payload: response.data.Search })
    }
    else {
      dispatch({ type: 'getMoviesForCardsData', payload: [] })
    }
  }
}

export function getMovies({ title, year, id, page }) {
  return async function getMoviesThunk(dispatch, getState) {
    const params = { s: title, y: year, i: id, page: page }
    const response = await axios.get('http://www.omdbapi.com/?apikey=3b9f341f', { params: params })
    if (id !== '' && title === '') {
      dispatch({ type: 'getMoviesInfo', payload: { payload: [response.data], title: '', id: id } })
    } else {
      dispatch({ type: 'getMoviesInfo', payload: { payload: response.data.Search, title: title, id: '' } })
    }

  }
}



