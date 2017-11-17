import React, {Component} from 'react'
import {connect} from 'react-redux'
import {WhiteSpace, WingBlank, Tag} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import TimeFilterBar from '../../components/timeFilterBar'
import CateEntFilterBar from '../../components/cateEntFilterBar'
import './entComparePage.css'
import {routeGoBack} from '../../utils/router'
import {doLoadingDataAction} from './entComparePage.redux'

class EntCompareView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            updateSign: true
        };
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
        return (100/length).toFixed(2) + '%';
    };
    renderTableLine = (data) => {
        const width = this.calculateWith(data.length);
        const containerStyle = {display: 'flex', flexDirection: 'row', height: '35px', borderBottom: '1px solid #3a9ee4',paddingRight: '6px'};
        return <div style={containerStyle}>
                {
                    data.map((item, key) => {
                        const style = {
                            flexGrow: 0,
                            flexShrink: (key ? 0 : 1),      //空间补足，标题缩小，其他
                            width: width,
                            paddingLeft: (key ? null : '6px'),
                            textAlign: (key ? 'right' : 'left'),
                            fontSize: '12px',
                        }
                        return <p style={style} key={key}>{item}</p>
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
                                return <div key={entName} style={{width: '50%', paddingBottom: '15px'}}>
                                    <Tag className="ent-tag" closable
                                         onClose={() => this.onEntCanceled(entName)}>{entName}</Tag>
                                </div>
                            })
                        }
                    </div>
                </div>
            )
        }
    };

    componentWillMount() {
        this.props.loadData();
    }
    render () {
        return (
            <div>
                <TopNavBar title="企业对比" leftContent="返回" onLeftBtnClick={routeGoBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>
                    <CateEntFilterBar marginTop="41px"/>
                    <WhiteSpace/>
                    <TimeFilterBar marginTop="82px"/>

                    {this.renderEntPanel()}

                    {this.renderTable()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        storeData: state.entComparePage
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