import React from 'react'
import {connect} from 'react-redux'
import TopNavBar from '../../components/topNavBar'
import {routeToSettingPage} from '../../utils/router'

class StatisticView extends React.Component{
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                <TopNavBar title="统计" leftContent="设置" onLeftBtnClick={routeToSettingPage}/>

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