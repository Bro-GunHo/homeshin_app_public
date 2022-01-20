import types from '../actions/types';

const defaultState = {
  mt_code: null,
  mt_id: null,
  mt_idx: null,
  mt_level: null,
  mt_name: null,
  mt_hp: null,
  mt_img: null,
  mt_img_big: null,
  mt_push_yn: 'Y',
};

export default login = (state = defaultState, action) => {
  // For Debugger
  // console.log(state);

  switch (action.type) {
    case types.UPDATE_LOGIN_CK:
      return {
        mt_code: action.mt_code,
        mt_id: action.mt_id,
        mt_idx: action.mt_idx,
        mt_level: action.mt_level,
        mt_name: action.mt_name,
        mt_hp: action.mt_hp,
        mt_img: action.mt_img,
        mt_img_big: action.mt_img_big,
        mt_push_yn: action.mt_push_yn ? action.mt_push_yn : 'Y',
      };
    case types.UPDATE_PUSH:
      return {
        ...state,
        mt_push_yn: action.mt_push_yn,
      };
    default:
      return state;
  }
};

export const logout = () => {
  return defaultState;
};
