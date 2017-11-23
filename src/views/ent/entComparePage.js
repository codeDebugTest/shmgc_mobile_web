import React, {Component} from 'react'
import {connect} from 'react-redux'
import {WhiteSpace, WingBlank, Tag} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import TimeLocationPicker from '../../components/timeLocationPicker'
import CateEntPicker from '../../components/cateEntPicker'
import './entComparePage.css'
import {ChangeRoute} from '../../utils/router'
import {doLoadingDataAction} from './entComparePage.redux'
import { getFilterLoactions} from '../../utils/filterConditionConfig'

class EntCompareView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            updateSign: true
        };
        this.filterLocations = getFilterLoactions();
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
        const containerStyle = {display: 'flex', flexDirection: 'row', height: '40px', borderBottom: '1px solid #3a9ee4',paddingRight: '2px'};
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
                            lineHeight: '40px'
                        }
                        return <p style={style} key={key} className="no-margin-p">{item}</p>
                    })
                }
            </div>
    };
    renderTable = () => {
        const tableData = this.props.storeData;
        if (tableData && tableData.loadingSuccess) {
            return <WingBlank>
                {this.renderTableLine([''].concat(tableData.entList))}
                {this.renderTableLine(['采购金额'].concat(tableData.totalAmountStrList))}
                {this.renderTableLine(['采购数量'].concat(tableData.quantityStrList))}
                {this.renderTableLine(['平均单价'].concat(tableData.averagePriceStrList))}
                {this.renderTableLine(['项目总数'].concat(tableData.totalPiCountStrList))}
                {this.renderTableLine(['进行中'].concat(tableData.runningPiCountStrList))}
                {this.renderTableLine(['已结束'].concat(tableData.finishedPiCountStrList))}
            </WingBlank>
        }
        return null;
    };

    renderEntPanel = () => {
        const entList = this.props.storeData && this.props.storeData.entList;
        if (entList && entList.length) {
            const lineStyle = {display: 'flex', flexWrap: 'wrap', padding: '10px 0'};
            return (
                <div style={{paddingTop: '10px'}}>
                    <p className="half-margin-p">已选择企业</p>
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

    componentWillMount() {
        this.props.loadData({
            loginName: 'zhougang',
            password: '123456',
            selectedEntList: this.props.storeData.entCompareList
        });
    }
    render () {
        return (
            <div>
                <TopNavBar title="企业对比" leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>
                    <CateEntPicker marginTop="41px"
                                   categories={this.props.commonData.filterCategories}
                                   ents={this.props.commonData.subEnts}/>

                    <TimeLocationPicker marginTop="75px" locations={this.filterLocations}/>

                    {this.renderEntPanel()}
                    {this.renderTable()}
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