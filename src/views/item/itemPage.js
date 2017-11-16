import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {SearchBar, Button} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'

class ItemView extends React.Component{
    routeToSettingPage() {
        browserHistory.push({
            pathname: `/setting`
        })
    }
    render () {
        return (
            <div>
                <TopNavBar title="项目" leftContent="设置" onLeftBtnClick={this.routeToSettingPage}/>

                <div className="main-section">
                    <SearchBar placeholder="项目名称"/>
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

const ConnectedItemView = connect(mapStateToProps, mapDispatchToProps)(ItemView);
export default ConnectedItemView;