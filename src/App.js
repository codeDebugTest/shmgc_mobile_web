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
        return (
            <div className="App">

                {this.props.children}

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
