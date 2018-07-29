import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authReducer, IAuthState } from './auth';

export interface IAppState {
  auth: IAuthState;
}

const store = combineReducers<IAppState>({
  auth: authReducer,
});

export const initializeStore = (initialState = {}) => createStore(
  store,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);