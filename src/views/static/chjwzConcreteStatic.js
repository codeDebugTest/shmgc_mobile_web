import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace, WingBlank} from 'antd-mobile'
import TimeLocationPicker from '../../components/timeLocationPicker'
import TopNavBar from "../../components/topNavBar";
import {doLoadingDataAction} from './chjwzConcreteStatic.redux'
import {ChangeRoute} from '../../utils/router'
import { getFilterLoactions} from '../../utils/fiterConditionConfig'

class ChJWZConcreteStaticPage extends React.Component {
    constructor(props) {
        super(props);
        this.item = this.props.storeData.item;
        this.filterLocations = getFilterLoactions();
    }

    render() {
        return (
            <div>
                <TopNavBar title={this.item && this.item.name} leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="41px" locations={this.filterLocations}/>

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
