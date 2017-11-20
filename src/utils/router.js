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
export function routeToHomeItem() {
    browserHistory.push({
        pathname: `/home/item`
    })
}

export function routeToEntStatic() {
    browserHistory.push({
        pathname: `/statistic/ent`
    })
}
export function routeToCateStatic() {
    browserHistory.push({
        pathname: `/statistic/cate`
    })
}
export function routeToChjwzConcreteStatic() {
    browserHistory.push({
        pathname: `statistic/chjwz-concrete`
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

