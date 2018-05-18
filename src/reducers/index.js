import { combineReducers } from 'redux';
import chartReducer from './chartReducer';

// The rootReducer in store.js
export default combineReducers({
  chart: chartReducer,
});
