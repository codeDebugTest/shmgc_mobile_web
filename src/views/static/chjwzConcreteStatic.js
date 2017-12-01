import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace, WingBlank, Card,Flex} from 'antd-mobile'
import TimeLocationPicker from '../../components/timeLocationPicker'
import TopNavBar from "../../components/topNavBar";
import PieChartCard from '../../components/pieChartCard'
import {doLoadingDataAction} from './chjwzConcreteStatic.redux'
import {ChangeRoute} from '../../utils/router'
import { getFilterLocations, getRequestTimeLocationCondition} from '../../utils/filterConditionConfig'

class ChJWZConcreteStaticPage extends React.Component {
    constructor(props) {
        super(props);
        this.item = this.props.storeData.item;
    }

    renderOverviewCard = (title, item) => {
        const titleStyle = {width: '100%', paddingTop: '5px', textAlign: 'center', fontSize:'15px',};
        const pBigStyle = {fontSize:'12px', textAlign: 'left', width: '65%'};
        const pSmallStyle = {fontSize:'12px', textAlign: 'left', width: '35%'};
        return (
            <Card style={{paddingBottom: 0, backgroundColor: '#e9f1ea', borderRadius: 0}}>
                <Card.Header title={<div style={titleStyle}>{title}</div>}/>
                <Card.Body style={{paddingTop: '5px'}}>
                    <Flex>
                        <p style={pBigStyle}>采购金额：{item.purchaseAmountStr}</p>
                        <p style={pSmallStyle}>项目总数：{item.piCountStr}</p>
                    </Flex>

                    <Flex>
                        <p style={pBigStyle}>采购数量：{item.purchaseQuantityStr}</p>
                    </Flex>
                </Card.Body>
            </Card>
        )
    }

    renderStaticData = () => {
        const staticData = this.props.storeData.staticData;
        if (this.props.storeData.loadingSuccess && staticData) {
            return (
                staticData.map((item, key) => {
                    const parentEntname = item.parentEnt.shortName;
                    const selfCardTitle = '城建物资承接' + parentEntname  + '统计';
                    return (
                        <div key={key}>
                            <div style={{border: '2px solid #ddd'}}>
                                {this.renderOverviewCard(parentEntname, item.parent)}
                                <WhiteSpace/>

                                {this.renderOverviewCard(selfCardTitle, item.self)}

                                <PieChartCard staticData={item.percentage} id={item.parentEnt.entId}/>
                            </div>
                            <WhiteSpace/>
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
    }
    render() {
        return (
            <div className="cjwz-concrete-background">
                <TopNavBar title='上海城建物资混凝土' style={{backgroundColor: 'inherit'}}
                           leftContent={<div className="back-icon"/>}
                           onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom" style={{backgroundColor: 'inherit', position: 'inherit'}}>
                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="87px" tabStyle="white-style"
                                        noLocation={true}
                                        confirmCallback={this.loadStaticData}
                                        pickerCondition={this.pickerCondition}/>
                    <WhiteSpace/>
                    <WhiteSpace/>

                    <WingBlank >
                        {this.renderStaticData()}
                    </WingBlank>
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
