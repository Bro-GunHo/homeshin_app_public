import * as loginAction from './loginAction';
import * as idxAction from './idxAction';
import * as gpsAction from './gpsAction';
import * as sconfAction from './sconfAction';
import * as langAction from './langAction';
import * as routeAction from './routeAction';

const ActionCreators = Object.assign({},
    loginAction, idxAction, gpsAction, sconfAction, langAction, routeAction
);


export default ActionCreators;
