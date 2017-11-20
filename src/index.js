import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import appReducer from './redux/index'
import './index.css';
import ConnectedNotFoundView from './views/notFoundPage'
import ConnectedHomeView from './views/home/homePage'
import ConnectedHomeItemView from './views/home/homeItem'
import ConnectedHomeStaticView from './views/home/homeStatic'
import ConnectedEntView from './views/ent/entPage'
import ConnectedEntCompareView from './views/ent/entComparePage'
import ConnectedItemView from './views/item/itemPage'
import ConnectedItemDetailView from './views/item/itemDetailPage'
import ConnectedStatisticView from './views/static/statisticPage'
import ConnectedEntStaticView from './views/static/entStatisticPage'
import ConnectedCateStaticView from './views/static/cateStaticPage'
import ConnectedChJWZConcreteView from './views/static/chjwzConcreteStatic'
import ConnectedEntCateFilterView from './views/static/entCateFilter'
import ConnectedSettingView from './views/setting/settingPage'
import ConnectedApp from './App'
import {ROUTE_PATH} from './utils/router'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(appReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path={ROUTE_PATH.ROOT} component={ConnectedApp}>
                <IndexRoute component={ConnectedHomeView}/>
                <Route exact path={ROUTE_PATH.HOME} component={ConnectedHomeView}/>
                <Route exact path={ROUTE_PATH.HOME_STATIC} component={ConnectedHomeStaticView}/>
                <Route exact path={ROUTE_PATH.HOME_ITEM} component={ConnectedHomeItemView}/>
                <Route exact path={ROUTE_PATH.ENT} component={ConnectedEntView}/>
                <Route exact path={ROUTE_PATH.ENT_COMPARE} component={ConnectedEntCompareView}/>
                <Route exact path={ROUTE_PATH.PURCHASE_ITEM} component={ConnectedItemView}/>
                <Route exact path={ROUTE_PATH.PURCHASE_ITEM_DETAIL} component={ConnectedItemDetailView}/>
                <Route path={ROUTE_PATH.STATIC} component={ConnectedStatisticView}/>
                <Route path={ROUTE_PATH.STATIC_ENT} component={ConnectedEntStaticView}/>
                <Route path={ROUTE_PATH.STATIC_CATE} component={ConnectedCateStaticView}/>
                <Route path={ROUTE_PATH.STATIC_CHJWZ_CONCRETE} component={ConnectedChJWZConcreteView}/>
                <Route path={ROUTE_PATH.STATIC_ENT_CATE_FILTER} component={ConnectedEntCateFilterView}/>
                <Route path={ROUTE_PATH.SETTING} component={ConnectedSettingView}/>
                <Route path="*" component={ConnectedNotFoundView}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
