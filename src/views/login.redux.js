import {loginRequest} from '../utils/restApi'
import { getFilterCategories, testFilerEnts} from '../utils/filterConditionConfig'

export const USER_LOGIN = 'user_login';
export const USER_LOGIN_SUCCESS = 'user_login_success';
export const USER_LOGIN_FAILED = 'user_login_failed';

export function doLoginAction(params) {
    return dispatch => {
        dispatch({type: USER_LOGIN});

        return loginRequest(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: USER_LOGIN_SUCCESS,
                        response: response.result && response.result[0]
                    });
                } else {
                    dispatch({type: USER_LOGIN_FAILED, error: response.return_message});
                }
            }, () => {
                dispatch({type: USER_LOGIN_FAILED, error: '连接失败，请检查网络是否通畅！'});
            }
        )
    }
}

export function loginReducer(state={filterCategories: getFilterCategories(), subEnts: testFilerEnts}, action) {
    switch (action.type) {
        case USER_LOGIN:
            return Object.assign({}, state, {loading: true});
        case USER_LOGIN_SUCCESS:
            const categories = getFilterCategories(action.response);
            return Object.assign({}, state, {loading: false, loginSuccess: true, filterCategories: categories, ...action.response});
        case USER_LOGIN_FAILED:
            return Object.assign({}, state, {loading: false, loginSuccess: false, error: action.error});
        default:
            return state;
    }
}
