import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace, WingBlank} from 'antd-mobile'
import TimeFilterBar from '../../components/timeFilterBar'
import TopNaveBar from "../../components/topNavBar";
import {doLoadingDataAction} from './chjwzConcreteStatic.redux'
import {routeGoBack} from '../../utils/router'


class ChJWZConcreteStaticPage extends React.Component {
    constructor(props) {
        super(props);
        this.item = this.props.storeData.item;
    }

    render() {
        return (
            <div>
                <TopNaveBar title={this.item && this.item.name} leftContent="返回" onLeftBtnClick={routeGoBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>
                    <TimeFilterBar marginTop="41px"/>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        storeData: state.chJWZConcreteStatic
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingDataAction(params))
        }
    }
};
const ConnectedChJWZConcreteView = connect(mapStateToProps, mapDispatchToProps)(ChJWZConcreteStaticPage);
export default ConnectedChJWZConcreteView
