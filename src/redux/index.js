import {combineReducers} from 'redux'
import {entComparePageReducer} from '../views/ent/entComparePage.redux'
import {entPageReducer} from '../views/ent/entPage.redux'
import {homePageReducer} from '../views/home/homePage.redux'
import {homeStaticReducer} from '../views/home/homeStatic.redux'
import {itemPageReducer} from '../views/item/itemPageRedux'
import {itemDetailPageReducer} from '../views/item/itemDetailPage.redux'
import {statisticReducer} from '../views/static/statisticPage.redux'
import {appRouterReducer} from '../AppRedux'

const appReducer = combineReducers({
    appRouter: appRouterReducer,
    entPage: entPageReducer,
    entComparePage: entComparePageReducer,
    homePage: homePageReducer,
    homeStatic: homeStaticReducer,
    itemPage: itemPageReducer,
    itemDetailPage: itemDetailPageReducer,
    statistic: statisticReducer
});

export default appReducer;