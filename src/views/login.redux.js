import {loginRequest} from '../utils/restApi'
import { getFilterCategories, testFilerEnts} from '../utils/filterConditionConfig'

export const USER_LOGIN = 'user_login';
export const USER_LOGIN_SUCCESS = 'user_login_success';
export const USER_LOGIN_FAILED = 'user_login_failed';
export const SET_TOKEN = 'set_user_token';
export const SET_SYSTEM_YEAR = 'set_system_year';

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

function getYearConfig(year) {
    const current = new Date();
    const config = {
        year: year || current.getFullYear(),
        startMonth: 1
    };
    if (year < current.getFullYear()) {
        config.endMonth = 12;
    } else {
        config.endMonth = current.getMonth() + 1;
    }
    config.filterCondition = {
        pbBeginDate: config.year + '-' + config.startMonth,			//发布起始时间
        pbEndDate: config.year + '-' + config.endMonth				//发布结束时间,
    }
    return config
}

export function loginReducer(state={filterCategories: getFilterCategories(), subEnts: testFilerEnts}, action) {
    switch (action.type) {
        case USER_LOGIN:
            return Object.assign({}, state, {loading: true, loginInfo: action.data});
        case USER_LOGIN_SUCCESS:
            const categories = getFilterCategories(action.response);
            return Object.assign({}, state, {
                    loading: false,
                    loginSuccess: true,
                    filterCategories: categories,
                    ...action.response,
                    userInfo: {token: action.response.token},
                    yearConfig: getYearConfig(),
                }
            );
        case USER_LOGIN_FAILED:
            return Object.assign({}, state, {loading: false, loginSuccess: false, error: action.error});
        case SET_TOKEN:
            return Object.assign({}, state, {...action.data});
        case SET_SYSTEM_YEAR:
            return Object.assign({}, state, {yearConfig: getYearConfig(action.year)});
        default:
            return state;
    }
}
