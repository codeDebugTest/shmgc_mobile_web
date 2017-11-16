import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import TopNavBar from '../../components/topNavBar'

class Setting extends React.Component {

    routeToHistory() {
        browserHistory.goBack();
    }

    render () {
        return (
            <div>
                <TopNavBar title="设置" leftContent="返回" onLeftBtnClick={this.routeToHistory}/>
                <div className="main-section">
                    <h1>系统设置页面</h1>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}
const ConnectedSettingView = connect(mapStateToProps, mapDispatchToProps)(Setting)
export default ConnectedSettingView
