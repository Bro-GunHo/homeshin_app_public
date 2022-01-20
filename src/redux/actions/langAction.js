import types from './types';

export function updateLang(data) {
    const args = JSON.parse(data);

    return {
        type: types.UPDATE_LANG,
        data: args
    };
}
