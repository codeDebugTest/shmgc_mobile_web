import {browserHistory} from 'react-router'

export function routeToSettingPage() {
    browserHistory.push({
        pathname: `/setting`
    })
}
export function routeToHomeStatic() {
    browserHistory.push({
        pathname: `/home/static`
    })
}

export function routeToEntStatic() {
    browserHistory.push({
        pathname: `/statistic/ent`
    })
}

export function routeToEntCompare() {
    browserHistory.push({
        pathname: '/ent/compare'
    })
}
export function routeGoBack() {
    browserHistory.goBack();
};

