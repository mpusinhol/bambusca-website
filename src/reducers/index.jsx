import { combineReducers } from 'redux';

import ViajanetReducer from './viajanetReducer';
import RequestReducer from './requestReducer';

export default combineReducers({
  Viajanet: ViajanetReducer,
  Request: RequestReducer,
});