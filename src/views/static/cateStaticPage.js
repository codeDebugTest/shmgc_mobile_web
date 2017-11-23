import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TimeLocationPicker from '../../components/timeLocationPicker'
import CateEntPicker from '../../components/cateEntPicker'
import TopNavBar from "../../components/topNavBar";
import StaticView from '../../components/staticView'
import {doLoadingDataAction} from './cateStaticPage.redux'
import {ChangeRoute} from '../../utils/router'
import { getFilterLoactions, getRequestTimeLocationCondition, getRequestCateEntCondition} from '../../utils/filterConditionConfig'

class CateStaticPage extends React.Component {
    constructor(props) {
        super(props);
        this.cate = this.props.storeData.cate;
        this.filterLocations = getFilterLoactions(this.props.commonData);
        this.cateEntCondition ={};
        this.timeLocationCondition = {};
        this.onCateEntPickedCallback = this.onCateEntPickedCallback.bind(this);
        this.onTimeLocationPickedCallback = this.onTimeLocationPickedCallback.bind(this);
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
            this.cate.name = cateArray[0].split('-')[1] + '-' + cateArray[1].split('-')[1];
        } else {
            filterCondition.cateId = this.cate.cateId;
        }
        this.props.loadData({
            loginName: 'zhougang',
            password: '123456',
            filterCondition: { ...filterCondition}
        });
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
                <TopNavBar title={this.cate && this.cate.name} leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
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
                    <WhiteSpace/>
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
