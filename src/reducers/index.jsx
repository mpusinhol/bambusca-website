import { combineReducers } from 'redux';

import HomeReducer from './home-reducer';
import ExampleReducer from './example-reducer';
import ViajanetReducer from './viajanetReducer';

export default combineReducers({
  Home: HomeReducer,
  Example: ExampleReducer,
  Viajanet: ViajanetReducer
});