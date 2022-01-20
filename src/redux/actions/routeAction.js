import types from './types';

export function updateRoute(routeName, last_mt_id) {
    return {
        type: types.UPDATE_ROUTE,
        routeName: routeName,
        last_mt_id: last_mt_id,// 로그아웃 후에도 아이디 유지
    };
}
