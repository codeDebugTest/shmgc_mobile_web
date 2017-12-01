import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TimeLocationPicker from '../../components/timeLocationPicker'
import CateEntPicker from '../../components/cateEntPicker'
import TopNavBar from "../../components/topNavBar";
import StaticView from '../../components/staticView'
import {doLoadingDataAction} from './cateStaticPage.redux'
import {ChangeRoute, sendMsgToRN} from '../../utils/router'
import { getFilterLocations, getRequestTimeLocationCondition, getRequestCateEntCondition} from '../../utils/filterConditionConfig'

class CateStaticPage extends React.Component {
    constructor(props) {
        super(props);
        this.cate = this.props.storeData.cate;
        this.filterLocations = getFilterLocations(this.props.commonData);
        this.cateEntCondition = {...this.initCateCondition()};
        this.timeLocationCondition = {};
        this.onCateEntPickedCallback = this.onCateEntPickedCallback.bind(this);
        this.onTimeLocationPickedCallback = this.onTimeLocationPickedCallback.bind(this);
    }
    initCateCondition = () => {
        const paths =this.cate.catePaths;
        return {cate: [paths[0].cateId + '-' + paths[0].name, paths[1].cateId + '-' + paths[1].name]}
    }
    renderStaticOverview = () => {
        if (this.props.storeData.loadingSuccess) {
            return <StaticView staticData={this.props.storeData}/>
        }
        return null;
    }

    loadStaticData = () => {
        const filterCondition = {
            ...getRequestTimeLocationCondition(this.timeLocationCondition),
            ...getRequestCateEntCondition(this.cateEntCondition)
        };
        if (filterCondition.cateId) {
            const cateArray = this.cateEntCondition.cate;
            const parent = cateArray[0].split('-')[1];
            const child =  cateArray[1].split('-')[1];
            this.cate.name = parent + (child === '全部' ? '' : '-' + child);
        } else {
            filterCondition.cateId = this.cate.cateId;
        }
        this.props.loadData({
            ...this.props.commonData.userInfo,
            filterCondition: { ...filterCondition}
        });
        sendMsgToRN({title: this.cate.name});
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
        this.loadStaticData();
    }
    render() {
        return (
            <div>
                <TopNavBar title={this.cate && this.cate.name} leftContent={<div className="back-icon"/>} onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>
                    <CateEntPicker marginTop="41px"
                                   categories={this.props.commonData.filterCategories}
                                   ents={this.props.commonData.subEnts}
                                   cateEntCondition ={this.cateEntCondition}
                                   confirmCallback={this.onCateEntPickedCallback}/>

                    <TimeLocationPicker marginTop="77px"
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
        storeData: state.cateStatic,
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
const ConnectedCateStaticView = connect(mapStateToProps, mapDispatchToProps)(CateStaticPage);
export default ConnectedCateStaticView
