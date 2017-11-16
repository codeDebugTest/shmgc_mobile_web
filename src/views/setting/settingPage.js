import React from 'react'
import {connect} from 'react-redux'
import TopNavBar from '../../components/topNavBar'
import {routeGoBack} from '../../utils/router'

class Setting extends React.Component {

    render () {
        return (
            <div>
                <TopNavBar title="设置" leftContent="返回" onLeftBtnClick={routeGoBack}/>
                <div className="main-section-no-bottom">
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
