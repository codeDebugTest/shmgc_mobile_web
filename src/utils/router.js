import {browserHistory} from 'react-router'

export const ROUTE_PATH = {
    ROOT: '/',

    SETTING: '/setting',
    HOME: '/home',
    HOME_STATIC: '/home/static',
    HOME_ITEM: '/home/item',

    STATIC: '/statistic',
    STATIC_ENT: '/statistic/ent',
    STATIC_CATE: '/statistic/cate',
    STATIC_CHJWZ_CONCRETE: '/statistic/chjwz-concrete',

    ENT: '/ent',
    ENT_COMPARE: '/ent/compare',

    PURCHASE_ITEM: '/purchase-item',
    PURCHASE_ITEM_DETAIL: '/purchase-item/detail'
};

export const ChangeRoute = function () {
    const _move = (pathname) => {
        browserHistory.push({
            pathname: pathname
        })
    }
    const _back = () => {
        browserHistory.goBack();
    }
    return {
        goSettingPage: () => _move(ROUTE_PATH.SETTING),
        goHomePage: () => _move(ROUTE_PATH.HOME),
        goHomeStaticPage: () => _move(ROUTE_PATH.HOME_STATIC),
        goHomeItemPage: () => _move(ROUTE_PATH.HOME_ITEM),
        goStaticPage: () => _move(ROUTE_PATH.STATIC),
        goStaticEntPage: () => _move(ROUTE_PATH.STATIC_ENT),
        goStaticCatePage: () => _move(ROUTE_PATH.STATIC_CATE),
        goStaticChjwzConcretePage: () => _move(ROUTE_PATH.STATIC_CHJWZ_CONCRETE),
        goEntPage: () => _move(ROUTE_PATH.ENT),
        goEntComparePage: () => _move(ROUTE_PATH.ENT_COMPARE),
        goPurchaseItemPage: () => _move(ROUTE_PATH.PURCHASE_ITEM),
        goPurchaseItemDetailPage: () => _move(ROUTE_PATH.PURCHASE_ITEM_DETAIL),
        goBack: () => _back(),
    }
}();

