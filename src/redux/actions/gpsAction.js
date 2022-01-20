import types from './types';

export function updateGps(current_latlng, user_lat, user_lng, user_sigun, user_address, user_address2, updateTimeG) {

    return {
        type: types.UPDATE_GPS,
        current_latlng: current_latlng,
        user_lat: user_lat,
        user_lng: user_lng,
        user_sigun: user_sigun,
        user_address: user_address,
        user_address2: user_address2,
        updateTimeG: updateTimeG,
    };
}
