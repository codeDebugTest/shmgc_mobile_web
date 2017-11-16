import React, {Component} from 'react'
import {connect} from 'react-redux'
import TopNavBar from '../../components/topNavBar'
import {routeGoBack} from '../../utils/router'

class EntCompareView extends Component{
    render () {
        return (
            <div>
                <TopNavBar title="企业对比" leftContent="返回" onLeftBtnClick={routeGoBack}/>
                <h1>企业对比 page</h1>
            </div>
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