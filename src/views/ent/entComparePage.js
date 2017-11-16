import React, {Component} from 'react'
import {connect} from 'react-redux'

class EntCompareView extends Component{
    render () {
        return (
            <div><h1>企业对比 page</h1></div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {}
};
const mapDispatchToProps = (dispatch) => {
    return {}
};

const ConnectedEntCompareView = connect(mapStateToProps, mapDispatchToProps)(EntCompareView);
export default ConnectedEntCompareView