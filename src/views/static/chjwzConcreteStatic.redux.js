import {fetchSupplierStaticData} from '../../utils/restApi'

export const INIT_CHJWZ_CONCRETE_STATIC_PAGE = 'init_chjwz_concrete_static_page';
const FETCH_CHJWZ_CONCRETE_STATIC_DATA = 'fetch_chjwz_concrete_static_data';
const FETCH_CHJWZ_CONCRETE_STATIC_DATA_SUCCESS = 'fetch_chjwz_concrete_static_data_success';
const FETCH_CHJWZ_CONCRETE_STATIC_DATA_FAILED = 'fetch_chjwz_concrete_static_data_failed';

export function doLoadingDataAction(params) {
    return dispatch => {
        dispatch({type: FETCH_CHJWZ_CONCRETE_STATIC_DATA});
        return fetchSupplierStaticData(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: FETCH_CHJWZ_CONCRETE_STATIC_DATA_SUCCESS,
                        response: response.result
                    })
                } else {
                    dispatch({type: FETCH_CHJWZ_CONCRETE_STATIC_DATA_FAILED, error: response.return_message});
                }
            }, ()=> {
                dispatch({type: FETCH_CHJWZ_CONCRETE_STATIC_DATA_FAILED, error: ''});
            }
        )
    }
}

export function chJWZConcreteStaticReducer(state={}, action) {
    switch (action.type) {
        case INIT_CHJWZ_CONCRETE_STATIC_PAGE:
            return Object.assign({}, state, {item: action.item});
        case FETCH_CHJWZ_CONCRETE_STATIC_DATA:
            return Object.assign({}, state, {loading: true});
        case FETCH_CHJWZ_CONCRETE_STATIC_DATA_SUCCESS:
            return Object.assign({}, state, {loading: false, loadingSuccess:true, ...action.response});
        case FETCH_CHJWZ_CONCRETE_STATIC_DATA_FAILED:
            return Object.assign({}, state, {loading: false, error: action.error});
        default:
            return state
    }
}
