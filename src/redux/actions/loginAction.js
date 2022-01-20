import types from './types';

export function updateLogin(args) {
  //   const args = JSON.parse(data);

  return {
    type: types.UPDATE_LOGIN_CK,
    mt_code: args.mt_code,
    mt_id: args.mt_id,
    mt_idx: args.mt_idx,
    mt_level: args.mt_level,
    mt_name: args.mt_name,
    mt_hp: args.mt_hp,
    mt_img: args.mt_img,
    mt_img_big: args.mt_img_big,
    mt_push_yn: args.mt_push_yn,
  };
}

export function logout() {
  return {
    type: types.UPDATE_LOGOUT,
    mt_code: '',
    mt_id: '',
    mt_idx: '',
    mt_level: '',
    mt_name: '',
    mt_hp: '',
    mt_img: '',
    mt_img_big: '',
    mt_push_yn: 'Y',
  };
}

export function push_change(mt_push_yn) {
  return {
    type: types.UPDATE_PUSH,
    mt_push_yn: mt_push_yn,
  };
}
