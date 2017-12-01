import {fetchPurchaseItemDetail} from '../../utils/restApi'

export const INIT_ITEM_DETAIL_PAGE = 'init_item_detail_page';
const FETCH_PURCHASE_ITEM_DETAIL = 'fetch_purchase_item_detail';
const FETCH_PURCHASE_ITEM_DETAIL_SUCCESS = 'fetch_item_detail_success';
const FETCH_PURCHASE_ITEM_DETAIL_FAILED = 'fetch_item_detail_failed';

export function doLoadingDataAction(params, callback) {
    return dispatch => {
        dispatch({type: FETCH_PURCHASE_ITEM_DETAIL});
        return fetchPurchaseItemDetail(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: FETCH_PURCHASE_ITEM_DETAIL_SUCCESS,
                        response: response.result && response.result[0]
                    })
                } else {
                    dispatch({type: FETCH_PURCHASE_ITEM_DETAIL_FAILED, error: response.return_message});
                }
            }, ()=> {
                dispatch({type: FETCH_PURCHASE_ITEM_DETAIL_FAILED, error: ''});
            }
        ).then(()=> {
            if (callback) {
                callback();
            }
        })
    }
}

export function itemDetailPageReducer(state={}, action) {
    switch (action.type) {
        case INIT_ITEM_DETAIL_PAGE:
            return Object.assign({}, state, {itemId: action.data});
        case FETCH_PURCHASE_ITEM_DETAIL:
            return Object.assign({}, state, {loading: true, loadingSuccess:false});
        case FETCH_PURCHASE_ITEM_DETAIL_SUCCESS:
            return Object.assign({}, state, {loading: false, loadingSuccess:true, purchaseItem: action.response});
        case FETCH_PURCHASE_ITEM_DETAIL_FAILED:
            return Object.assign({}, state, {loading: false, loadingSuccess:false, error: action.error});
        default:
            return state
    }
}