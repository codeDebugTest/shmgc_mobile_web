import {fetchStaticOverviewData} from '../../utils/restApi'

export const INIT_CATE_STATIC_PAGE = 'init_cate_static_page';
const FETCH_CATE_STATIC_OVERVIEW_DATA = 'fetch_cate_static_overview_data';
const FETCH_CATE_STATIC_OVERVIEW_DATA_SUCCESS = 'fetch_cate_static_overview_data_success';
const FETCH_CATE_STATIC_OVERVIEW_DATA_FAILED = 'fetch_cate_static_overview_data_failed';

export function doLoadingDataAction(params) {
    return dispatch => {
        dispatch({type: FETCH_CATE_STATIC_OVERVIEW_DATA});
        return fetchStaticOverviewData(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: FETCH_CATE_STATIC_OVERVIEW_DATA_SUCCESS,
                        response: response.result
                    })
                } else {
                    dispatch({type: FETCH_CATE_STATIC_OVERVIEW_DATA_FAILED,error: response.return_message});
                }
            }, ()=> {
                dispatch({type: FETCH_CATE_STATIC_OVERVIEW_DATA_FAILED, error: ''});
            }
        )
    }
}

export function cateStatisticReducer(state={}, action) {
    switch (action.type) {
        case INIT_CATE_STATIC_PAGE:
            return Object.assign({}, state, {cate: action.cate});
        case FETCH_CATE_STATIC_OVERVIEW_DATA:
            return Object.assign({}, state, {loading: true});
        case FETCH_CATE_STATIC_OVERVIEW_DATA_SUCCESS:
            return Object.assign({}, state, {loading: false, loadingSuccess:true, ...action.response});
        case FETCH_CATE_STATIC_OVERVIEW_DATA_FAILED:
            return Object.assign({}, state, {loading: false, error: action.error});
        default:
            return state
    }
}
