import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace, WingBlank, Card,Flex, Accordion} from 'antd-mobile'
import TimeLocationPicker from '../../components/timeLocationPicker'
import TopNavBar from "../../components/topNavBar";
import PieChartCard from '../../components/pieChartCard'
import {doLoadingDataAction} from './chjwzConcreteStatic.redux'
import {ChangeRoute, sendMsgToRN} from '../../utils/router'
import { getRequestTimeLocationCondition} from '../../utils/filterConditionConfig'

class ChJWZConcreteStaticPage extends React.Component {
    constructor(props) {
        super(props);
        this.item = this.props.storeData.item;
    }

    renderOverviewCard = (title, item, hideTitle) => {
        const pBigStyle = {fontSize:'12px', textAlign: 'left', width: '65%'};
        const pSmallStyle = {fontSize:'12px', textAlign: 'left', width: '35%'};
        return (
            <div style={{paddingTop: '10px'}}>
                {hideTitle ? null : <p className="half-margin-p">{title}</p>}
                <WingBlank>
                    <Flex>
                        <p style={pBigStyle}>采购金额：{item.purchaseAmountStr}</p>
                        <p style={pSmallStyle}>项目总数：{item.piCountStr}</p>
                    </Flex>

                    <Flex>
                        <p style={pBigStyle}>采购数量：{item.purchaseQuantityStr}</p>
                    </Flex>
                </WingBlank>
            </div>
        )
    }

    renderStaticData = () => {
        const staticData = this.props.storeData.staticData;
        if (this.props.storeData.loadingSuccess && staticData) {
            return (
                staticData.map((item, key) => {
                    const parentEntName = item.parentEnt.shortName;
                    const selfCardTitle = '城建物资承接' + parentEntName  + '统计';
                    return (
                        <div key={key}>
                            <Accordion >
                                <Accordion.Panel header={parentEntName}>
                                    {this.renderOverviewCard(parentEntName, item.parent, true)}

                                    {this.renderOverviewCard(selfCardTitle, item.self)}

                                    <PieChartCard staticData={item.percentage} id={item.parentEnt.entId}/>
                                </Accordion.Panel>
                            </Accordion>
                            <WhiteSpace/>
                        </div>
                    )
                })
            )
        }
        return null;
    }

    loadStaticData = (pickerCondition) => {
        this.pickerCondition = {...pickerCondition};
        this.props.loadData({
            ...this.props.commonData.userInfo,
            filterCondition: getRequestTimeLocationCondition(this.pickerCondition)
        });
    }
    componentWillMount() {
        this.loadStaticData({});
        sendMsgToRN({title: '上海城建物资混凝土', backBtnEnabled: true});
    }
    render() {
        const hideHeader = this.props.commonData.hideHeader;
        return (
            <div>
                <TopNavBar title='上海城建物资混凝土'
                           hideHeader={hideHeader}
                           leftContent={<div className="back-icon"/>}
                           onLeftBtnClick={ChangeRoute.goBack}
                />
                <div className={"main-section-no-bottom " + (hideHeader ? 'no-top gap': 'gap')} >
                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="87px"
                                        noLocation={true}
                                        confirmCallback={this.loadStaticData}
                                        pickerCondition={this.pickerCondition}/>
                    <WhiteSpace/>
                    <WhiteSpace/>

                    {this.renderStaticData()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        storeData: state.chJWZConcreteStatic,
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
const ConnectedChJWZConcreteView = connect(mapStateToProps, mapDispatchToProps)(ChJWZConcreteStaticPage);
export default ConnectedChJWZConcreteView
