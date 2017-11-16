import {fetchEntOverviewData} from '../../utils/restApi'

export const FETCH_ENT_OVERVIEW_DATA = 'fetch_ent_overview_data';
export const FETCH_ENT_OVERVIEW_DATA_SUCCESS = 'fetch_ent_overview_data_success';
export const FETCH_ENT_OVERVIEW_DATA_FAILED = 'fetch_ent_overview_data_failed';

export function doLoadingDataAction(params) {
    return dispatch => {
        dispatch({type: FETCH_ENT_OVERVIEW_DATA});
        return fetchEntOverviewData(params).then(
            response => {
                if (response.return_code == 0) {
                    dispatch({
                        type: FETCH_ENT_OVERVIEW_DATA_SUCCESS,
                        response: response.result
                    });
                } else {
                    dispatch({
                        type: FETCH_ENT_OVERVIEW_DATA_FAILED,
                        error:''
                    });
                }
            }, ()=> {
                dispatch({type: FETCH_ENT_OVERVIEW_DATA_FAILED, error: ''});
            }
        )
    }
}


export function entPageReducer(state={}, action) {
    switch (action.type) {
        case FETCH_ENT_OVERVIEW_DATA:
            return Object.assign({}, state, {loading: true});
        case FETCH_ENT_OVERVIEW_DATA_SUCCESS:
            return Object.assign({}, state, {loading: false, entList: action.response});
        case FETCH_ENT_OVERVIEW_DATA_FAILED:
            return Object.assign({}, state, {loading: false, error: action.error});
        default:
            return state;
    }
}
