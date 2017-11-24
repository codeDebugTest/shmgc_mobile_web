import React from 'react'
import {connect} from 'react-redux'
import {SearchBar, Button} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import BottomTabBar from '../../components/bottomTabBar'
import {ChangeRoute} from '../../utils/router'

class ItemView extends React.Component{
    render () {
        return (
            <div>
                <TopNavBar title="项目" leftContent={<div className="setting-icon"/>} onLeftBtnClick={ChangeRoute.goSettingPage}/>

                <div className="main-section">
                    <SearchBar placeholder="项目名称"/>
                </div>

                <BottomTabBar selectedTab='purchaseItem'/>
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