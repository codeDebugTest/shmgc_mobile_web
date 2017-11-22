import {fetchPurchaseItems} from '../../utils/restApi'

export const INIT_HOME_ITEM_PAGE = 'init_home_item_page';
const FETCH_HOME_PURCHASE_ITEMS = 'fetch_home_purchase_items';
const FETCH_HOME_PURCHASE_ITEMS_SUCCESS = 'fetch_home_purchase_items_success';
const FETCH_HOME_PURCHASE_ITEMS_FAILED = 'fetch_home_purchase_items_failed';

export function doLoadingDataAction(params) {
    return dispatch => {
        dispatch({type: FETCH_HOME_PURCHASE_ITEMS});
        return fetchPurchaseItems(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: FETCH_HOME_PURCHASE_ITEMS_SUCCESS,
                        response: response.result
                    })
                } else {
                    dispatch({type: FETCH_HOME_PURCHASE_ITEMS_FAILED, error: ''});
                }
            }, ()=> {
                dispatch({type: FETCH_HOME_PURCHASE_ITEMS_FAILED, error: ''});
            }
        )
    }
}

export function homeItemReducer(state={}, action) {
    switch (action.type) {
        case INIT_HOME_ITEM_PAGE:
            return Object.assign({}, state, {itemTypeName: action.itemTypeName});
        case FETCH_HOME_PURCHASE_ITEMS:
            return Object.assign({}, state, {loading: true});
        case FETCH_HOME_PURCHASE_ITEMS_SUCCESS:
            return Object.assign({}, state, {loading: false, loadingSuccess:true, purchaseItems: action.response});
        case FETCH_HOME_PURCHASE_ITEMS_FAILED:
            return Object.assign({}, state, {loading: false, purchaseItems: [], error: action.error});
        default:
            return state
    }
}
