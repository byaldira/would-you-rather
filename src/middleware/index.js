import thunk from 'redux-thunk';
import log from './log';
import { applyMiddleware } from 'redux';

export default applyMiddleware(thunk, log);