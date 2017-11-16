import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {Button} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import {routeToSettingPage} from '../../utils/router'

class EntView extends React.Component{

    render () {
        return (
            <div>
                <TopNavBar title="项目" leftContent="设置" onLeftBtnClick={routeToSettingPage}/>
                <div className="main-section">
                    <h1>Enterprise page</h1>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {}
};
const mapDispatchToProps = (dispatch) => {
    return {}
}

const ConnectedEntView = connect(mapStateToProps, mapDispatchToProps)(EntView);
export default ConnectedEntView;