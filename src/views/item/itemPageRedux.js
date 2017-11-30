import {fetchPurchaseItems} from '../../utils/restApi'

export const INIT_ITEM_PAGE = 'init_item_page';
const FETCH_PURCHASE_ITEMS = 'fetch_purchase_items';
const FETCH_PURCHASE_ITEMS_SUCCESS = 'fetch_items_success';
const FETCH_PURCHASE_ITEMS_FAILED = 'fetch_items_failed';

export function doLoadingDataAction(params, callback) {
    return dispatch => {
        dispatch({type: FETCH_PURCHASE_ITEMS});
        return fetchPurchaseItems(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: FETCH_PURCHASE_ITEMS_SUCCESS,
                        response: response.result
                    })
                    Promise.resolve()
                } else {
                    dispatch({type: FETCH_PURCHASE_ITEMS_FAILED, error: response.return_message});
                    Promise.reject()
                }
            }, ()=> {
                dispatch({type: FETCH_PURCHASE_ITEMS_FAILED, error: ''});
                Promise.reject()
            }
        ).then(()=> {
            if (callback) {
                callback();
            }
        })
    }
}

export function itemPageReducer(state={}, action) {
    switch (action.type) {
        case INIT_ITEM_PAGE:
            return Object.assign({}, state);
        case FETCH_PURCHASE_ITEMS:
            return Object.assign({}, state, {loading: true});
        case FETCH_PURCHASE_ITEMS_SUCCESS:
            return Object.assign({}, state, {loading: false, loadingSuccess:true, purchaseItems: action.response});
        case FETCH_PURCHASE_ITEMS_FAILED:
            return Object.assign({}, state, {loading: false, purchaseItems: [], error: action.error});
        default:
            return state
    }
}
