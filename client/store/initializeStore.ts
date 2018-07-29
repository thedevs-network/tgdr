import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initializeStore = (initialState = {}) => createStore(
  store => store,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default initializeStore;