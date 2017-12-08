import React from 'react';
import './App.css';
import {connect} from  'react-redux'
import {browserHistory} from 'react-router'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
