import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';

export default function configureStore() {
    return createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
      )
    );
}