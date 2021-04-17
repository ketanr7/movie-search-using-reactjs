import { combineReducers } from 'redux'

import moviesReducer from './components/homePage/homePageSlice'
import movieDetailsReducer from './components/detailsPage/detailsPageSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  movies: moviesReducer,
  movieDetails:movieDetailsReducer
})

export default rootReducer