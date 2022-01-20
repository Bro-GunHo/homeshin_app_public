import types from '../actions/types';

const defaultState = {
    routeName: "",
    last_mt_id: "",
}

export default rconf = (state = defaultState, action) => {
    // For Debugger
    // console.log(state);

    switch (action.type) {
        case types.UPDATE_ROUTE:
            return {
                routeName : action.routeName,
                last_mt_id : action.last_mt_id,
            };
        default:
          return state;
    }
};
