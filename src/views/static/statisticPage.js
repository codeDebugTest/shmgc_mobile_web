import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {Button, SegmentedControl} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'

class StatisticView extends React.Component{
    routeToSettingPage() {
        browserHistory.push({
            pathname: `/setting`
        })
    }

    render () {
        return (
            <div>
                <TopNavBar title="统计" leftContent="设置" onLeftBtnClick={this.routeToSettingPage}/>

                <div className="main-section">

                    <h1>统计 page</h1>
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

const ConnectedStatisticView = connect(mapStateToProps, mapDispatchToProps)(StatisticView);
export default ConnectedStatisticView;