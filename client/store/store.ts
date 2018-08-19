import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { FormStateMap, reducer as formReducer } from 'redux-form';
import { authReducer, AuthStateTypes, IAuthState } from './auth';

export interface IAppState {
  auth: IAuthState;
  form: FormStateMap;
}

const rootReducer = combineReducers<IAppState>({
  auth: authReducer,
  form: formReducer,
});

const store = (state: IAppState, action) => {
  if (action.type === AuthStateTypes.LOGOUT_REQUEST) {
    state = undefined;
  }
  
  return rootReducer(state, action);
};

export const initializeStore = (initialState = {}) => createStore(
  store,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);