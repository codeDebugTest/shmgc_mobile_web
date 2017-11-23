import {fetchStaticOverviewData} from '../../utils/restApi'

export const INIT_ENT_STATIC_PAGE = 'init_ent_static_page';
const FETCH_ENT_STATIC_OVERVIEW_DATA = 'fetch_ent_static_overview_data';
const FETCH_ENT_STATIC_OVERVIEW_DATA_SUCCESS = 'fetch_ent_static_overview_data_success';
const FETCH_ENT_STATIC_OVERVIEW_DATA_FAILED = 'fetch_ent_static_overview_data_failed';

export function doLoadingDataAction(params) {
    return dispatch => {
        dispatch({type: FETCH_ENT_STATIC_OVERVIEW_DATA});
        return fetchStaticOverviewData(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: FETCH_ENT_STATIC_OVERVIEW_DATA_SUCCESS,
                        response: response.result
                    })
                } else {
                    dispatch({type: FETCH_ENT_STATIC_OVERVIEW_DATA_FAILED, error: response.return_message});
                }
            }, ()=> {
                dispatch({type: FETCH_ENT_STATIC_OVERVIEW_DATA_FAILED, error: ''});
            }
        )
    }
}

export function entStatisticReducer(state={}, action) {
    switch (action.type) {
        case INIT_ENT_STATIC_PAGE:
            return Object.assign({}, state, {ent: action.ent});
        case FETCH_ENT_STATIC_OVERVIEW_DATA:
            return Object.assign({}, state, {loading: true});
        case FETCH_ENT_STATIC_OVERVIEW_DATA_SUCCESS:
            return Object.assign({}, state, {loading: false, loadingSuccess:true, ...action.response});
        case FETCH_ENT_STATIC_OVERVIEW_DATA_FAILED:
            return Object.assign({}, state, {loading: false, error: action.error});
        default:
            return state
    }
}
