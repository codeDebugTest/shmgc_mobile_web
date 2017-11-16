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

export function routeGoBack() {
    browserHistory.goBack();
};