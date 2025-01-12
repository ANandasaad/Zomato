import {combineReducers} from 'redux';
import userReducer from './reducers/userSlice';
import cartReducer from './reducers/cartSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});
export default rootReducer;
