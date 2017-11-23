import {fetchStaticOverviewData} from '../../utils/restApi'
const FETCH_HOME_STATIC_DATA = 'fetch_home_static_data';
const FETCH_HOME_STATIC_DATA_SUCCESS = 'fetch_home_static_data_success';
const FETCH_HOME_STATIC_DATA_FAILED = 'fetch_home_static_data_failed';

export function doLoadingDataAction(params) {
    return dispatch => {
        dispatch({type: FETCH_HOME_STATIC_DATA});
        return fetchStaticOverviewData(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: FETCH_HOME_STATIC_DATA_SUCCESS,
                        response: response.result && response.result[0]
                    })
                } else {
                    dispatch({type: FETCH_HOME_STATIC_DATA_FAILED, error: response.return_message});
                }
            }, ()=> {
                dispatch({type: FETCH_HOME_STATIC_DATA_FAILED, error: ''});
            }
        )
    }
}


export function homeStaticReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_HOME_STATIC_DATA:
            return Object.assign({}, state, {loading: true});
        case FETCH_HOME_STATIC_DATA_SUCCESS:
            return Object.assign({}, state, {loading: false, loadingSuccess:true, ...action.response});
        case FETCH_HOME_STATIC_DATA_FAILED:
            return Object.assign({}, state, {loading: false, error: action.error});
        default:
            return state
    }
}