import React, {Component} from 'react'
import {connect} from 'react-redux'
import {WhiteSpace, WingBlank, Tag} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import TimeLocationPicker from '../../components/timeLocationPicker'
import CateEntPicker from '../../components/cateEntPicker'
import './entComparePage.css'
import {ChangeRoute, sendMsgToRN} from '../../utils/router'
import {doLoadingDataAction} from './entComparePage.redux'
import { getFilterLocations, getRequestTimeLocationCondition, getRequestCateEntCondition} from '../../utils/filterConditionConfig'

class EntCompareView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            updateSign: true
        };
        this.filterLocations = getFilterLocations(this.props.commonData);
        this.cateEntCondition ={};
        this.timeLocationCondition = {};
        this.onCateEntPickedCallback = this.onCateEntPickedCallback.bind(this);
        this.onTimeLocationPickedCallback = this.onTimeLocationPickedCallback.bind(this);
    }

    removeCompareEnt =(arrayIndex) => {
        const tableData = this.props.storeData;
        tableData.entList.splice(arrayIndex, 1);
        tableData.totalAmountStrList.splice(arrayIndex, 1);
        tableData.quantityStrList.splice(arrayIndex, 1);
        tableData.averagePriceStrList.splice(arrayIndex, 1);
        tableData.totalPiCountStrList.splice(arrayIndex, 1);
        tableData.runningPiCountStrList.splice(arrayIndex, 1);
        tableData.finishedPiCountStrList.splice(arrayIndex, 1);
    };
    onEntCanceled = (entName) => {
        const index = this.props.storeData.entList.indexOf(entName);
        if (index !== -1) {
            this.removeCompareEnt(index);
            this.setState({updateSign: !this.state.updateSign});
        }
    }

    calculateWith =(length) => {
        return (82/(length -1)).toFixed(2) + '%';
    };
    renderTableLine = (data) => {
        const width = this.calculateWith(data.length);
        const isLast = data[0] === '已结束';
        const containerStyle = {
            display: 'flex',
            flexDirection: 'row',
            height: '40px',
            borderBottom: isLast ? '' : '1px solid #ddd',
        };
        return <div style={containerStyle}>
                {
                    data.map((item, key) => {
                        const style = {
                            flexGrow: 0,
                            flexShrink: (key ? 0 : 1),      //空间补足，标题缩小，其他
                            width: (key ? width : '18%'),
                            paddingLeft: (key ? null : '2px'),
                            textAlign: (key ? 'right' : 'left'),
                            fontSize: '12px',
                            lineHeight: '40px',
                        }
                        if(key) {
                            style.fontSize = '13px';
                        } else {
                            style.color = '#9e9d9d';
                        }
                        return <p style={style} key={key} className="no-margin-p">{item}</p>
                    })
                }
            </div>
    };
    renderTable = () => {
        const tableData = this.props.storeData;
        if (tableData && tableData.loadingSuccess) {
            return <div style={{padding: '0 5px', borderRadius:'3px', backgroundColor:'#fff'}}>
                    {this.renderTableLine(['', ...tableData.entList])}
                    {this.renderTableLine(['采购金额', ...tableData.totalAmountStrList])}
                    {this.renderTableLine(['采购数量', ...tableData.quantityStrList])}
                    {this.renderTableLine(['平均单价', ...tableData.averagePriceStrList])}
                    {this.renderTableLine(['项目总数', ...tableData.totalPiCountStrList])}
                    {this.renderTableLine(['进行中', ...tableData.runningPiCountStrList])}
                    {this.renderTableLine(['已结束', ...tableData.finishedPiCountStrList])}
                </div>
        }
        return null;
    };

    renderEntPanel = () => {
        const entList = this.props.storeData && this.props.storeData.entList;
        if (entList && entList.length) {
            const lineStyle = {display: 'flex', flexWrap: 'wrap', padding: '10px 0'};
            return (
                <div style={{paddingTop: '10px', borderRadius:'3px', backgroundColor: '#fff'}}>
                    <div style={lineStyle}>
                        {
                            entList.map((entName) => {
                                if (entName !== '' && entName !== '--') {
                                    return <div key={entName} style={{width: '50%', paddingBottom: '15px'}}>
                                        <Tag className="ent-tag" closable
                                             onClose={() => this.onEntCanceled(entName)}>{entName}</Tag>
                                    </div>
                                }
                            })
                        }
                    </div>
                </div>
            )
        }
    };

    loadStaticData = () => {
        const filterCondition = {
            ...getRequestTimeLocationCondition(this.timeLocationCondition),
            ...getRequestCateEntCondition(this.cateEntCondition)
        };
        filterCondition.entId = null;

        this.props.loadData({
            ...this.props.commonData.userInfo,
            selectedEntList: this.props.storeData.entCompareList,
            filterCondition: {...filterCondition}
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
        sendMsgToRN({title: '企业对比', backBtnEnabled: true});
    }
    render () {
        const hideHeader = this.props.commonData.userInfo && this.props.commonData.userInfo.hideHeader;
        return (
            <div>
                <TopNavBar title="企业对比"
                           hideHeader={hideHeader}
                           leftContent={<div className="back-icon"/>}
                           onLeftBtnClick={ChangeRoute.goBack}
                />
                <div className={"main-section-no-bottom " + (hideHeader ? 'no-top gap': 'gap')}>
                    <WhiteSpace/>
                    <CateEntPicker marginTop="41px"
                                   hideEntTab={true}
                                   categories={this.props.commonData.filterCategories}
                                   ents={this.props.commonData.subEnts}
                                   cateEntCondition ={this.cateEntCondition}
                                   confirmCallback={this.onCateEntPickedCallback}/>

                    <TimeLocationPicker marginTop="75px"
                                        locations={this.filterLocations}
                                        confirmCallback={this.onTimeLocationPickedCallback}
                                        pickerCondition={this.timeLocationCondition}/>

                    <WingBlank>
                        <WhiteSpace/>
                        {this.renderEntPanel()}
                        <WhiteSpace/>
                        {this.renderTable()}
                    </WingBlank>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        storeData: state.entComparePage,
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

const ConnectedEntCompareView = connect(mapStateToProps, mapDispatchToProps)(EntCompareView);
export default ConnectedEntCompareView