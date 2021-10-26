import { combineReducers } from 'redux';
import commonReducer from './reducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

// 注入reducer
const rootReducer = combineReducers({
  commonReducer,
});
const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);
export default store;
