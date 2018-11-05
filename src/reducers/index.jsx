import { combineReducers } from 'redux';

import HomeReducer from './home-reducer';
import ExampleReducer from './example-reducer';

export default combineReducers({
  Home: HomeReducer,
  Example: ExampleReducer
});