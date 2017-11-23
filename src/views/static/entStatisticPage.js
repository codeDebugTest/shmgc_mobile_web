import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TimeLocationPicker from '../../components/timeLocationPicker'
import CateEntPicker from '../../components/cateEntPicker'
import TopNavBar from "../../components/topNavBar";
import StaticView from '../../components/staticView'
import {doLoadingDataAction} from './entStaticPage.redux'
import {ChangeRoute} from '../../utils/router'
import { getFilterLoactions, getFilterCondition, getDefaultTimeLocationCondition} from '../../utils/fiterConditionConfig'


class EntStaticPage extends React.Component {
    constructor(props) {
        super(props);
        this.ent = this.props.storeData.ent;
        this.filterLocations = getFilterLoactions(this.props.commonData);
    }

    renderStaticOverview = () => {
        if (this.props.storeData.loadingSuccess) {
            return <StaticView staticData={this.props.storeData}/>
        }
        return null;
    }

    loadStaticData = (pickerCondition) => {
        this.pickerCondition = {...pickerCondition};
        this.props.loadData({
            loginName: 'zhougang',
            password: '123456',
            filterCondition: {
                entId: this.ent.entId,
                ...getFilterCondition(this.pickerCondition)}
        });
    };

    componentWillMount() {
        this.loadStaticData(getDefaultTimeLocationCondition())
    }

    render() {
        return (
            <div>
                <TopNavBar title={this.ent && this.ent.name} leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>

                    <CateEntPicker marginTop="41px"/>
                    <TimeLocationPicker marginTop="75px"
                                        locations={this.filterLocations}
                                        confirmCallback={this.loadStaticData}
                                        pickerCondition={this.pickerCondition}/>

                    <WhiteSpace/>

                    {this.renderStaticOverview()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        storeData: state.entStatic,
        commonData: state.login
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