import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import indexReducer from './indexReducer';
// import gpsReducer from './gpsReducer';
// import sconfReducer from './sconfReducer';
// import langReducer from './langReducer';
// import routeReducer from './routeReducer';

export default combineReducers({
  login: loginReducer,
  index: indexReducer,
  // gps: gpsReducer,
  // sconf: sconfReducer,
  // lang: langReducer,
  // rconf: routeReducer,
});
