import React from 'react';
import './App.css';
import {connect} from  'react-redux'
import {browserHistory} from 'react-router'
import BottomTabBar from './components/bottomTabBar'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.defaultTab = 'home';
    }

    render() {
        const currentPath = browserHistory.getCurrentLocation().pathname;
        const isFirstLevelPath = currentPath.split('/').length < 3;
        return (
            <div className="App">

                {this.props.children}

                {isFirstLevelPath ? <BottomTabBar selectedTab={this.defaultTab}/> : null}
            </div>
        );
    }
}
const mapStateToProps = (state) => (
    {}
);
const mapDispatchToProps = (dispatch) => (
    {}
)
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
