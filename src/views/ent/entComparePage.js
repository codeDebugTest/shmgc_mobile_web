import React, {Component} from 'react'
import {connect} from 'react-redux'
import {WhiteSpace, WingBlank} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import {Tag} from 'antd-mobile'
import './entComparePage.css'
import {routeGoBack} from '../../utils/router'

class EntCompareView extends Component{
    constructor(props) {
        super(props);
        this.tableData = this.props.storeData;
        this.state = {
            updateSign: true
        };
    }

    removeCompareEnt =(arrayIndex) => {
        this.tableData.entList.splice(arrayIndex, 1);
        this.tableData.totalAmountStrList.splice(arrayIndex, 1);
        this.tableData.quantityStrList.splice(arrayIndex, 1);
        this.tableData.averagePriceStrList.splice(arrayIndex, 1);
        this.tableData.totalPiCountStrList.splice(arrayIndex, 1);
        this.tableData.runningPiCountStrList.splice(arrayIndex, 1);
        this.tableData.finishedPiCountStrList.splice(arrayIndex, 1);
    };
    onEntCanceled = (entName) => {
        const index = this.tableData.entList.indexOf(entName);
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
        if (this.tableData && this.tableData.loadingSuccess) {
            return <WingBlank>
                {this.renderTableLine([''].concat(this.tableData.entList))}
                {this.renderTableLine(['采购金额'].concat(this.tableData.totalAmountStrList))}
                {this.renderTableLine(['采购数量'].concat(this.tableData.quantityStrList))}
                {this.renderTableLine(['平均单价'].concat(this.tableData.averagePriceStrList))}
                {this.renderTableLine(['项目总数'].concat(this.tableData.totalPiCountStrList))}
                {this.renderTableLine(['进行中'].concat(this.tableData.runningPiCountStrList))}
                {this.renderTableLine(['已结束'].concat(this.tableData.finishedPiCountStrList))}
            </WingBlank>
        }
        return null;
    };

    renderEntPanel = () => {
        const lineStyle = {display: 'flex', flexWrap: 'wrap'};
        const entList = this.tableData.entList;
        return (
            <div style={lineStyle}>
                {
                    entList.map((entName) => {
                        return <div key={entName} style={{width: '50%', paddingBottom: '15px'}}>
                            <Tag className="ent-tag" closable
                                 onClose={()=> this.onEntCanceled(entName)}>{entName}</Tag>
                            </div>
                    })
                }
            </div>
        )
    }
    render () {
        return (
            <div>
                <TopNavBar title="企业对比" leftContent="返回" onLeftBtnClick={routeGoBack}/>

                <p className="half-margin-p">已选择企业</p>
                <WhiteSpace/>
                {this.renderEntPanel()}

                {this.renderTable()}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        // storeData: state.entComparePage
        storeData: {
            loadingSuccess: true,
            entList: ['城建物资','水务建设', '公路桥梁'],
            totalAmountStrList: ['3,000万', '2,988万', '2,989万'],
            quantityStrList: ['--','--','--'],
            averagePriceStrList: ['--','--','--'],
            totalPiCountStrList: ['100', '99', '103'],
            runningPiCountStrList: ['1', '2', '0'],
            finishedPiCountStrList: ['99', '98', '103']
        }
    }
};
const mapDispatchToProps = (dispatch) => {
    return {}
};

const ConnectedEntCompareView = connect(mapStateToProps, mapDispatchToProps)(EntCompareView);
export default ConnectedEntCompareView