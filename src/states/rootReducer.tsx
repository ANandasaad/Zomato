import {combineReducers} from 'redux';
import userReducer from './reducers/UserSlice';

export const rootReducer = combineReducers({
  user: userReducer,
});
export default rootReducer;
