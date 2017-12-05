import {fetchPriceTrendData} from '../../utils/restApi'

const FETCH_TREND_DATA = 'fetch_cate_price_trend_data';
const FETCH_TREND_DATA_SUCCESS = 'fetch_cate_price_trend_data_success';
const FETCH_TREND_DATA_FAILED = 'fetch_cate_price_trend_data_failed';

export function doLoadingDataAction(params, callback) {
    return dispatch => {
        dispatch({type: FETCH_TREND_DATA});
        return fetchPriceTrendData(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: FETCH_TREND_DATA_SUCCESS,
                        response: response.result
                    })
                } else {
                    dispatch({type: FETCH_TREND_DATA_FAILED, error: response.return_message});
                }
            }, ()=> {
                dispatch({type: FETCH_TREND_DATA_FAILED, error: ''});
            }
        ).then(()=> {
            if (callback) {
                callback();
            }
        })
    }
}

export function discoveryPageReducer(state={}, action) {
    switch (action.type) {
        case FETCH_TREND_DATA:
            return Object.assign({}, state, {loading: true});
        case FETCH_TREND_DATA_SUCCESS:
            return Object.assign({}, state, {loading: false, loadingSuccess:true, purchaseItems: action.response});
        case FETCH_TREND_DATA_FAILED:
            return Object.assign({}, state, {loading: false, purchaseItems: [], error: action.error});
        default:
            return state
    }
}

