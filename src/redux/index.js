import {combineReducers} from 'redux'
import {entComparePageReducer} from '../views/ent/entComparePage.redux'
import {entPageReducer} from '../views/ent/entPage.redux'
import {homePageReducer} from '../views/home/homePage.redux'
import {homeItemReducer} from '../views/home/homeItem.redux'
import {homeStaticReducer} from '../views/home/homeStatic.redux'
import {itemPageReducer} from '../views/item/itemPageRedux'
import {itemDetailPageReducer} from '../views/item/itemDetailPage.redux'
import {statisticReducer} from '../views/static/statisticPage.redux'
import {entStatisticReducer} from '../views/static/entStaticPage.redux'
import {cateStatisticReducer} from '../views/static/cateStaticPage.redux'
import {appRouterReducer} from '../AppRedux'

const appReducer = combineReducers({
    appRouter: appRouterReducer,
    entPage: entPageReducer,
    entComparePage: entComparePageReducer,
    homePage: homePageReducer,
    homeStatic: homeStaticReducer,
    homeItem: homeItemReducer,
    itemPage: itemPageReducer,
    itemDetailPage: itemDetailPageReducer,
    statistic: statisticReducer,
    entStatic: entStatisticReducer,
    cateStatic: cateStatisticReducer,
});

export default appReducer;