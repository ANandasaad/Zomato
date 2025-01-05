import {combineReducers} from 'redux';
import userReducer from './reducers/userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
});
export default rootReducer;
