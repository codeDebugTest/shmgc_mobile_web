import {loginRequest} from '../utils/restApi'
import { getFilterCategories, testFilerEnts} from '../utils/filterConditionConfig'

export const USER_LOGIN = 'user_login';
export const USER_LOGIN_SUCCESS = 'user_login_success';
export const USER_LOGIN_FAILED = 'user_login_failed';
export const SET_TOKEN = 'user_token';

export function doLoginAction(params, callback) {
    return dispatch => {
        dispatch({type: USER_LOGIN, data: params});

        return loginRequest(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: USER_LOGIN_SUCCESS,
                        response: response.result && response.result[0]
                    });
                    Promise.resolve(true)
                } else {
                    dispatch({type: USER_LOGIN_FAILED, error: response.return_message});
                    Promise.reject()
                }
            }, () => {
                dispatch({type: USER_LOGIN_FAILED, error: '连接失败，请检查网络是否通畅！'});
                Promise.reject()
            }
        ).then(()=> {
            if (callback) {
                callback();
            }
        })
    }
}

export function loginReducer(state={filterCategories: getFilterCategories(), subEnts: testFilerEnts}, action) {
    switch (action.type) {
        case USER_LOGIN:
            return Object.assign({}, state, {loading: true, loginInfo: action.data});
        case USER_LOGIN_SUCCESS:
            const categories = getFilterCategories(action.response);
            const userInfo = {token: action.response.token};
            return Object.assign({}, state, {loading: false, loginSuccess: true, filterCategories: categories, ...action.response, userInfo: userInfo});
        case USER_LOGIN_FAILED:
            return Object.assign({}, state, {loading: false, loginSuccess: false, error: action.error});
        case SET_TOKEN:
            return Object.assign({}, state, {...action.data});
        default:
            return state;
    }
}
