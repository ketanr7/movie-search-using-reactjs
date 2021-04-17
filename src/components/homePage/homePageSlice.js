import axios from "axios";

const initialState = {
  movieIds:['tt5013056','tt4154756','tt0816711'],
  moviesData:[],
  movieCollection:[],
  hasMore:true
}


export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case 'getMoviesForCardsData': {
      const setHasMore = action.payload.length == 0?false:true
      return {
        ...state,
        hasMore:setHasMore,
        movieCollection:state.hasMore != true? state.movieCollection:state.movieCollection.concat(action.payload) 
      };
    }
    case 'getMoviesInfo': {
      state.movieCollection=[]
      return {
        ...state,
        movieCollection: action.payload 
      };
    }
    case 'fetchMoviesData': {
        return {
          ...state,
          moviesData: action.payload
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

export function getMoviesForCards({title,year,id,page}) {
  return async function getMoviesForCardsThunk(dispatch, getState) {
    const params = { s:title,y:year,i:id,page:page }
    const response = await axios.get('http://www.omdbapi.com/?apikey=3b9f341f',{params:params})
    if(response.data.Response != 'False'){
    dispatch({ type: 'getMoviesForCardsData', payload: response.data.Search })
  }
  else{
    dispatch({ type: 'getMoviesForCardsData', payload: [] })
  }
  }
}

export function getMovies({title,year,id,page}) {
  return async function getMoviesThunk(dispatch, getState) {
    const params = { s:title,y:year,i:id,page:page }
    const response = await axios.get('http://www.omdbapi.com/?apikey=3b9f341f',{params:params})
    if(id != '' && title == ''){
      dispatch({ type: 'getMoviesInfo', payload: [response.data] })
    } else{
      dispatch({ type: 'getMoviesInfo', payload: response.data.Search })
    }
   
  }
}



