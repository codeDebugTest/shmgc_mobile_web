import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import TimeLocationPicker from '../../components/timeLocationPicker'
import StaticView from '../../components/staticView'
import {doLoadingDataAction} from './homeStatic.redux'
import {ChangeRoute} from '../../utils/router'
import { getFilterLoactions, getRequestTimeLocationCondition} from '../../utils/filterConditionConfig'

class HomeStatic extends React.Component {
    constructor(props) {
        super(props);
        this.filterLocations = getFilterLoactions(this.props.commonData);
        this.pickerCondition = {};
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
            filterCondition: getRequestTimeLocationCondition(this.pickerCondition)
        });
    };

    componentWillMount() {
        this.loadStaticData({});
    }
    render() {
        return (
            <div>
                <TopNavBar title="企业数据总览" leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="41px" locations={this.filterLocations}
                                        confirmCallback={this.loadStaticData}
                                        pickerCondition={this.pickerCondition}/>

                    <p>数据统计概览</p>

                    {this.renderStaticOverview()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        storeData: state.homeStatic,
        commonData: state.login
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingDataAction(params));
        }
    }
};

const ConnectedHomeStaticView = connect(mapStateToProps, mapDispatchToProps)(HomeStatic);
export default ConnectedHomeStaticView;