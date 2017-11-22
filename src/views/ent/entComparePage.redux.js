import {fetchEntCompareData} from '../../utils/restApi'

export const INIT_ENT_COMPARE_PAGE = 'init_ent_compare_page';
export const FETCH_ENT_COMPARE_DATA = 'fetch_ent_compare_data';
export const FETCH_ENT_COMPARE_DATA_SUCCESS = 'fetch_ent_compare_data_success';
export const FETCH_ENT_COMPARE_DATA_FAILED = 'fetch_ent_compare_data_failed';

export function doLoadingDataAction(params) {
    return dispatch => {
        dispatch({type: FETCH_ENT_COMPARE_DATA});
        return fetchEntCompareData(params).then(
            response => {
                if (response.return_code == 0) {
                    dispatch({
                        type: FETCH_ENT_COMPARE_DATA_SUCCESS,
                        response: response.result && response.result[0]
                    });
                } else {
                    dispatch({
                        type: FETCH_ENT_COMPARE_DATA_FAILED,
                        error:''
                    });
                }
            }, ()=> {
                dispatch({type: FETCH_ENT_COMPARE_DATA_FAILED, error: ''});
            }
        )
    }
}

export function entComparePageReducer(state={}, action) {
    switch (action.type) {
        case INIT_ENT_COMPARE_PAGE: 
            return Object.assign({}, state, {entCompareList: action.compareList});
        case FETCH_ENT_COMPARE_DATA:
            return Object.assign({}, state, {loading: true});
        case FETCH_ENT_COMPARE_DATA_SUCCESS:
            return Object.assign({}, state, {loading: false, loadingSuccess: true, ...action.response});
        case FETCH_ENT_COMPARE_DATA_FAILED:
            return Object.assign({}, state, {loading: false, error: action.error});
        default:
            return state;
    }
}