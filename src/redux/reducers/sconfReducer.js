import types from '../actions/types';

let defaultState = {
    aname: null,
    aemail: null,
    acallno: null,
    aaddress: null,
    aceo: null,
    abizname: null,
    abizelc: null,
    abizno: null,
    aprivacy: null,
    acustomer: null,
    aorder_point: null,
    areview_point: null,
    aphoto_review_point: null,
    abank_account: null,
    abank_date: null,
    abiz_hours: null,
    adistance: null,
    temp_mt_id: null,
}

export default sconf = (state = defaultState, action) => {
    // For Debugger

    switch (action.type) {
        case types.UPDATE_SITE:
            return {
                aname : action.aname,
                aemail : action.aemail,
                acallno : action.acallno,
                aaddress : action.aaddress,
                aceo : action.aceo,
                abizname : action.abizname,
                abizelc: action.abizelc,
                abizno: action.abizno,
                aprivacy: action.aprivacy,
                acustomer: action.acustomer,
                aorder_point: action.aorder_point,
                areview_point: action.areview_point,
                aphoto_review_point: action.aphoto_review_point,
                abank_account : action.abank_account,
                abank_date : action.abank_date,
                abiz_hours : action.abiz_hours,
                adistance : action.adistance,
                temp_mt_id : action.temp_mt_id,
            };
        default:
          return state;
    }
};
