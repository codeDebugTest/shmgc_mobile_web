import React from 'react'
import {connect} from 'react-redux'
import TopNaveBar from "../../components/topNavBar"
import {WhiteSpace} from 'antd-mobile'
import {doLoadingDataAction} from './homeItem.redux'
import {ChangeRoute} from '../../utils/router'


class HomeItemPage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <TopNaveBar title={this.props.storeData.itemTypeName} leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        storeData: state.homeItem
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingDataAction(params))
        }
    }
};
const ConnectedHomeItemView = connect(mapStateToProps, mapDispatchToProps)(HomeItemPage);
export default ConnectedHomeItemView


