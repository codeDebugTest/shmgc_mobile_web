import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TimeLocationPicker from '../../components/timeLocationPicker'
import CateEntPicker from '../../components/cateEntPicker'
import TopNavBar from "../../components/topNavBar";
import StaticView from '../../components/staticView'
import {doLoadingDataAction} from './entStaticPage.redux'
import {ChangeRoute, sendMsgToRN} from '../../utils/router'
import { getFilterLocations, getRequestTimeLocationCondition, getDefaultTimeCondition,
getRequestCateEntCondition,getCateTitleByCondition,getTimeLocationTitleByConditon} from '../../utils/filterConditionConfig'


class EntStaticPage extends React.Component {
    constructor(props) {
        super(props);
        this.ent = this.props.storeData.ent;
        this.filterLocations = getFilterLocations(this.props.commonData);
        this.cateEntCondition ={ent: {shortName: this.ent&&this.ent.name, entId: this.ent&&this.ent.entId}};
        this.timeLocationCondition = {};
        this.onCateEntPickedCallback = this.onCateEntPickedCallback.bind(this);
        this.onTimeLocationPickedCallback = this.onTimeLocationPickedCallback.bind(this);
    }

    renderStaticOverview = () => {
        if (this.props.storeData.loadingSuccess) {
            const timeTitle = getTimeLocationTitleByConditon(this.timeLocationCondition);
            const cate = getCateTitleByCondition(this.cateEntCondition.cate) || '';
            return <StaticView staticData={this.props.storeData} title={cate + ' ' + timeTitle}/>
        }
        return null;
    }

    loadStaticData = () => {
        const filterCondition = {
            ...getRequestTimeLocationCondition(this.timeLocationCondition),
            ...getRequestCateEntCondition(this.cateEntCondition)
        };
        if(filterCondition.entId) {
            this.ent.name = this.cateEntCondition.ent.shortName
        } else {
            filterCondition.entId = this.ent.entId;
        }
        this.props.loadData({
            ...this.props.commonData.userInfo,
            filterCondition: {...filterCondition}
        });

        sendMsgToRN({title: this.ent.name, backBtnEnabled: true});
    };

    onCateEntPickedCallback =(condition) => {
        this.cateEntCondition = condition;
        this.loadStaticData();
    };
    onTimeLocationPickedCallback = (condition) => {
        this.timeLocationCondition = condition;
        this.loadStaticData();
    };

    componentWillMount() {
        this.loadStaticData({...getDefaultTimeCondition()})
    }

    render() {
        const hideHeader = this.props.commonData.hideHeader;
        return (
            <div>
                <TopNavBar title={this.ent && this.ent.name}
                           hideHeader={hideHeader}
                           leftContent={<div className="back-icon"/>}
                           onLeftBtnClick={ChangeRoute.goBack}
                />
                <div className={"main-section-no-bottom " + (hideHeader ? 'no-top': '')}>
                    <WhiteSpace/>

                    <CateEntPicker marginTop="41px"
                                   categories={this.props.commonData.filterCategories}
                                   ents={this.props.commonData.subEnts}
                                   cateEntCondition ={this.cateEntCondition}
                                   confirmCallback={this.onCateEntPickedCallback}/>

                    <TimeLocationPicker marginTop="75px"
                                        locations={this.filterLocations}
                                        confirmCallback={this.onTimeLocationPickedCallback}
                                        pickerCondition={this.timeLocationCondition}/>

                    <WhiteSpace/><WhiteSpace/>

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