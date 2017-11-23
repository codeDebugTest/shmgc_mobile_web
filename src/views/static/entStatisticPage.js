import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TimeLocationPicker from '../../components/timeLocationPicker'
import CateEntPicker from '../../components/cateEntPicker'
import TopNavBar from "../../components/topNavBar";
import {doLoadingDataAction} from './entStaticPage.redux'
import {ChangeRoute} from '../../utils/router'
import { getFilterLoactions} from '../../utils/fiterConditionConfig'

class EntStaticPage extends React.Component {
    constructor(props) {
        super(props);
        this.ent = this.props.storeData.ent;
        this.filterLocations = getFilterLoactions();
    }

    render() {
        return (
            <div>
                <TopNavBar title={this.ent && this.ent.name} leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>
                    <CateEntPicker marginTop="41px"/>
                    <TimeLocationPicker marginTop="75px" locations={this.filterLocations}/>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        storeData: state.entStatic
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingDataAction(params))
        }
    }
};
const ConnectedEntStaticView = connect(mapStateToProps, mapDispatchToProps)(EntStaticPage);
export default ConnectedEntStaticView