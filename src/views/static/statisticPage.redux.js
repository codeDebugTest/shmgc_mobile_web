import {fetchStaticOverviewData} from '../../utils/restApi'

const FETCH_STATIC_OVERVIEW_DATA = 'fetch_static_overview_data';
const FETCH_STATIC_OVERVIEW_DATA_SUCCESS = 'fetch_static_overview_data_success';
const FETCH_STATIC_OVERVIEW_DATA_FAILED = 'fetch_static_overview_data_failed';

export function doLoadingDataAction(params) {
    return dispatch => {
        dispatch({type: FETCH_STATIC_OVERVIEW_DATA});
        return fetchStaticOverviewData(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: FETCH_STATIC_OVERVIEW_DATA_SUCCESS,
                        response: response.result && response.result[0]
                    })
                } else {
                    dispatch({type: FETCH_STATIC_OVERVIEW_DATA_FAILED, error: response.return_message});
                }
            }, ()=> {
                dispatch({type: FETCH_STATIC_OVERVIEW_DATA_FAILED, error: ''});
            }
        )
    }
}

export function statisticReducer(state={}, action) {
    switch (action.type) {
        case FETCH_STATIC_OVERVIEW_DATA:
            return Object.assign({}, state, {loading: true});
        case FETCH_STATIC_OVERVIEW_DATA_SUCCESS:
            return Object.assign({}, state, {loading: false, loadingSuccess:true, ...action.response});
        case FETCH_STATIC_OVERVIEW_DATA_FAILED:
            return Object.assign({}, state, {loading: false, error: action.error});
        default:
            return state
    }
}
