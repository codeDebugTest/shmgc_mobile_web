import {fetchHomePageData, fetchStatisticDataByTime} from '../../utils/restApi'

export const FETCH_HOME_PAGE_DATA = 'fetch_home_page_data';
export const FETCH_HOME_PAGE_DATA_SUCCESS = 'fetch_home_page_data_success';
export const FETCH_HOME_PAGE_DATA_FAILED = 'fetch_home_page_data_failed';
export const FETCH_HOME_PAGE_CHART_DATA = 'fetch_home_page_chart_data';
export const FETCH_HOME_PAGE_CHART_DATA_SUCCESS = 'fetch_home_page_chart_data_success';
export const FETCH_HOME_PAGE_CHART_DATA_FAILED = 'fetch_home_page_chart_data_failed';

export function doLoadingAction(params) {
    return dispatch => {
        dispatch({type: FETCH_HOME_PAGE_DATA});

        return fetchHomePageData(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: FETCH_HOME_PAGE_DATA_SUCCESS,
                        response: response.result && response.result[0]
                    });
                } else {
                    dispatch({type: FETCH_HOME_PAGE_DATA_FAILED, error: response.return_message});
                }
            }, () => {
                dispatch({type: FETCH_HOME_PAGE_DATA_FAILED});
            }
         )
    }
}

export function updateChartAction(params) {
    return dispatch => {
        dispatch({type: FETCH_HOME_PAGE_CHART_DATA});

        return fetchHomePageData(params).then(
            response => {
                if(response.return_code == 0) {
                    dispatch({
                        type: FETCH_HOME_PAGE_CHART_DATA_SUCCESS,
                        response: response.result && response.result[0]
                    });
                } else {
                    dispatch({type: FETCH_HOME_PAGE_CHART_DATA_FAILED, error: response.return_message});
                }
            }, () => {
                dispatch({type: FETCH_HOME_PAGE_CHART_DATA_FAILED});
            }
        )
    }
}

export function homePageReducer(state={}, action) {
    switch (action.type) {
        case FETCH_HOME_PAGE_DATA:
            return Object.assign({}, state, {loading: true});
        case FETCH_HOME_PAGE_DATA_SUCCESS:
            return Object.assign({}, state, {loading: false, ...action.response});
        case FETCH_HOME_PAGE_DATA_FAILED:
            return Object.assign({}, state, {loading: false, loadFailed: true});
        case FETCH_HOME_PAGE_CHART_DATA:
            return Object.assign({}, state, {loading: true});
        case FETCH_HOME_PAGE_CHART_DATA_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                groupByTime: action.response.groupByTime,
                totalAmountStr: action.response.totalAmountStr,
                projectStat: action.response.projectStat
            });
        case FETCH_HOME_PAGE_CHART_DATA_FAILED:
            return Object.assign({}, state, {loading: false, error: action.error});
        default:
            return state;
    }
}
