import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import TimeLocationPicker from '../../components/timeLocationPicker'
import StaticView from '../../components/staticView'
import {doLoadingDataAction} from './homeStatic.redux'
import {ChangeRoute, sendMsgToRN} from '../../utils/router'
import { getFilterLocations, getRequestTimeLocationCondition, getDefaultTimeCondition, getTimeLocationTitleByConditon} from '../../utils/filterConditionConfig'

class HomeStatic extends React.Component {
    constructor(props) {
        super(props);
        this.filterLocations = getFilterLocations(this.props.commonData);
        this.pickerCondition = {};
    }

    renderStaticOverview = () => {
        if (this.props.storeData.loadingSuccess) {
            const title = getTimeLocationTitleByConditon(this.pickerCondition);

            return <StaticView staticData={this.props.storeData} title={title}/>
        }
        return null;
    }

    loadStaticData = (pickerCondition) => {
        this.pickerCondition = {...pickerCondition};
        this.props.loadData({
            ...this.props.commonData.userInfo,
            filterCondition: getRequestTimeLocationCondition(this.pickerCondition)
        });
    };

    componentWillMount() {
        this.loadStaticData({...getDefaultTimeCondition()});
        sendMsgToRN({title: this.props.commonData.entName, backBtnEnabled: true});
    }
    render() {
        const hideHeader = this.props.commonData.userInfo && this.props.commonData.userInfo.hideHeader;
        return (
            <div>
                <TopNavBar title={this.props.commonData.entName}
                           hideHeader={hideHeader}
                           leftContent={<div className="back-icon"/>}
                           onLeftBtnClick={ChangeRoute.goBack}/>
                <div className={"main-section-no-bottom " + (hideHeader ? 'no-top': '')}>
                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="41px" locations={this.filterLocations}
                                        confirmCallback={this.loadStaticData}
                                        pickerCondition={this.pickerCondition}/>

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