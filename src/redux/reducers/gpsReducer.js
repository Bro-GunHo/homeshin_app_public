import types from '../actions/types';

const defaultState = {
    current_latlng: null,
    user_lat: null,//35.205575,
    user_lng: null,//129.078473,
    user_sigun: null,//'부산 동래구',
    user_address: null,//'부산 동래구',
    user_address2: null,//이하 주소
    updateTimeG: null,
}

export default gps = (state = defaultState, action) => {
    // For Debugger

    switch (action.type) {
        case types.UPDATE_GPS:
            return {
                current_latlng : action.current_latlng,
                user_lat : action.user_lat,
                user_lng : action.user_lng,
                user_sigun : action.user_sigun,
                user_address : action.user_address,
                user_address2 : action.user_address2,
                updateTimeG : action.updateTimeG,
            };
        default:
          return state;
    }
};
