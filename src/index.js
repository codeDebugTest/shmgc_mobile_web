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
import ConnectedHomeStaticView from './views/home/homeStatic'
import ConnectedEntView from './views/ent/entPage'
import ConnectedEntCompareView from './views/ent/entComparePage'
import ConnectedItemView from './views/item/itemPage'
import ConnectedItemDetailView from './views/item/itemDetailPage'
import ConnectedStatisticView from './views/static/statisticPage'
import ConnectedEntStaticView from './views/static/entStatisticPage'
import ConnectedCateStaticView from './views/static/cateStaticPage'
import ConnectedSettingView from './views/setting/settingPage'
import ConnectedApp from './App'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(appReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={ConnectedApp}>
                <IndexRoute component={ConnectedHomeView}/>
                <Route exact path="/home" component={ConnectedHomeView}/>
                <Route exact path='/home/static' component={ConnectedHomeStaticView}/>
                <Route exact path="ent" component={ConnectedEntView}/>
                <Route exact path="ent/compare" component={ConnectedEntCompareView}/>
                <Route exact path="purchaseItem" component={ConnectedItemView}/>
                <Route exact path="purchaseItem/detail" component={ConnectedItemDetailView}/>
                <Route path="statistic" component={ConnectedStatisticView}/>
                <Route path="statistic/ent" component={ConnectedEntStaticView}/>
                <Route path="statistic/cate" component={ConnectedCateStaticView}/>
                <Route path="setting" component={ConnectedSettingView}/>
                <Route path="*" component={ConnectedNotFoundView}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
