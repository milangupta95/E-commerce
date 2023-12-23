import {createStore,applyMiddleware} from 'redux';
import loginReducer from './reducer';
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(loginReducer,composeWithDevTools(applyMiddleware(thunk)));
export default store;