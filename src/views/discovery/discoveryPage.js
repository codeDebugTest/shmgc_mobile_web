import React from 'react'
import {connect} from 'react-redux'
import TopNavBar from '../../components/topNavBar'
import GridBox from '../../components/gridBox'
import BottomTabBar from '../../components/bottomTabBar'
import {ChangeRoute, sendMsgToRN, ROUTE_PATH} from '../../utils/router'

class DiscoveryView extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        sendMsgToRN({title: '绿智汇阳光采购平台'})
    }
    render() {
        const hideHeader = this.props.commonData.hideHeader;
        return (
            <div>
                <TopNavBar title="绿智汇阳光采购平台"
                           hideHeader={hideHeader}
                           leftContent={<div className="setting-icon"/>}
                           onLeftBtnClick={ChangeRoute.goSettingPage}/>

                <BottomTabBar selectedTab={ROUTE_PATH.DISCOVERY}/>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        storeData: state.discovery,
        commonData: state.login
    }
}

const mapDispatchToProps = function (dispatch) {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryView);