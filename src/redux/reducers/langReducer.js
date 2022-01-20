import types from '../actions/types';

const defaultState = {
	"KR": {
		"mypage": {
			"mypage_1_1": ""
		},
		"validate": {
			"email1": ""
		},
		"search": {
			"info1": ""
		},
		"info1": ""
	},
	"VN": {
		"mypage": {
			"mypage_1_1": ""
		},
		"validate": {
			"email1": ""
		},
		"search": {
			"info1": ""
		},
		"info1": ""
	},
	"US": {
		"mypage": {
			"mypage_1_1": ""
		},
		"validate": {
			"email1": ""
		},
		"search": {
			"info1": ""
		},
		"info1": ""
	}
}

export default lang = (state = defaultState, action) => {
    // For Debugger

    switch (action.type) {
        case types.UPDATE_LANG:
            return action;
        default:
          return state;
    }
};
