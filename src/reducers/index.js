import { combineReducers } from 'redux';
import loginUser from './loginUser'
import sorular from './sorular'
import kullanicilar from './kullanicilar'
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({loginUser,sorular,kullanicilar , loadingBar: loadingBarReducer});