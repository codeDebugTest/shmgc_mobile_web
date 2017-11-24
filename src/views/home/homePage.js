import React from 'react'
import {connect} from 'react-redux'
import G2 from '@antv/g2'
import {doLoadingAction} from './homePage.redux'
import {Grid, Card, Icon, WingBlank, Flex} from 'antd-mobile'
import SectionBar from '../../components/sectionBar'
import TopNavBar from '../../components/topNavBar'
import BottomTabBar from '../../components/bottomTabBar'
import {G2Config, chartContainerCfg} from '../../utils/chartConfig'
import {ChangeRoute} from '../../utils/router'
import {INIT_HOME_ITEM_PAGE} from './homeItem.redux'
import {doLoginAction} from '../login.redux'
import  './homePage.css'

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.cardOnClickHandler = this.cardOnClickHandler.bind(this);
        this.onGridItemClick = this.onGridItemClick.bind(this);
        this.getUserInfo();
    }
    getUserInfo = () => {
        this.userInfo ={loginName: 'zhougang', password: '123456'};
        const query = this.props.location.query;
        console.log('props: ', this.props);
        if (query && query.loginName){
            this.userInfo.loginName = query.loginName
        }
        if (query && query.password){
            this.userInfo.password = query.password
        }
        if (query && query.token){
            this.userInfo.token = query.token
        }
        console.log('userInfo:', this.userInfo);
    }
    onGridItemClick = (gridItem) => {
        this.props.initHomeItemPage(gridItem.type);
        ChangeRoute.goHomeItemPage();
    };
    cardOnClickHandler = ()=>{
        // todo 路由跳转
        ChangeRoute.goHomeStaticPage();
        console.log('card on click')
    };

    renderEntChart(entChartData) {
        const formatter = (val) => {
            return (val/100000000).toFixed(1) + '亿元'
        };
        const chartCfg = new G2Config(this.entChart, entChartData);
        chartCfg.setChartScale('purchaseAmount', '采购金额');
        chartCfg.setChartScale( 'piCount', '项目数');
        chartCfg.setChartAxis('entName');
        chartCfg.setChartAxis('purchaseAmount', '采购金额', formatter, true);
        chartCfg.setChartAxis('piCount', '项目数');
        chartCfg.setChartInterval('entName', 'purchaseAmount', true);
        chartCfg.setChartLine('entName', 'piCount');
        chartCfg.setChartTooltip();
        this.entChart.render();
    }

    renderCateStat() {
        const cateData = this.props.storeData && this.props.storeData.amountOfCate;
        if (cateData && cateData.length > 0) {
            return (
                <Flex>
                {
                    cateData.map((item, key) => {
                        return (
                            <div className="category-div" key={key}>
                                <p style={{fontSize: '14px'}}>{item.cateName}</p>
                                <p style={{fontSize: '14px'}}>{item.amountStr}</p>
                            </div>
                        )
                    })
                }
                </Flex>
            )
        }
        return ''
    }

    componentWillMount() {
        if (!this.props.commonData.loginSuccess) {
            this.props.userLogin(this.userInfo);
        }
        this.props.loadData(this.userInfo);
    }

    componentDidMount() {
        this.entChart = new G2.Chart({
            container: 'entChart',
            ...chartContainerCfg,
        })
    }

    componentDidUpdate() {
        const entChartData = this.props.storeData && this.props.storeData.groupByEnt;
        if (entChartData && entChartData.length > 0) {
            this.renderEntChart(entChartData, this.props.storeData.axisRange)
        }
    }

    componentWillUnmount() {
        this.entChart.destroy();
    }
    render () {
        const homeData = this.props.storeData;
        const amountStyle = {textAlign: 'center', fontSize:'26px', color: '#d00d0d'};
        return (
            <div>
                <TopNavBar title={this.props.commonData.entName} leftContent={<div className="setting-icon"/>} onLeftBtnClick={ChangeRoute.goSettingPage}/>
                <div className="main-section">
                    <SectionBar sectionName="项目数据概览" backgroundColor={'#55ace8'}/>
                    <Grid data={homeData.projectStat} columnNum={3} square={false} hasLine={false}
                          renderItem={
                            dataItem => (
                                <div>
                                    <p className="small-margin-p" style={{fontSize: '26px', color: '#eff305'}}>{dataItem.countStr}</p>
                                    <p className="small-margin-p" style={{fontSize: '14px', color: '#e7eaec'}}>{dataItem.display}</p>
                                </div>
                            )
                          }
                          onClick ={this.onGridItemClick}
                    />

                    <Card onClick={this.cardOnClickHandler}>
                        <Card.Header title={(<div style={{fontSize:'16px'}}>企业概览数据</div>)} extra={(<Icon type="right"/>)}/>
                        <Card.Body>
                            <div style={amountStyle}>￥{homeData.totalAmountStr}</div>
                        </Card.Body>
                        <Card.Footer content="采购总金额"/>
                    </Card>

                    <WingBlank size="sm">
                        {/*<canvas id="entChart" className="canvas-chart"/>*/}
                        <div id="entChart"></div>
                    </WingBlank>

                    {this.renderCateStat()}
                </div>
                <BottomTabBar selectedTab='home'/>
            </div>

        )
    }
}

const mapStateToProps = (state) =>{
    return {
        storeData: state.homePage,
        commonData: state.login
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingAction(params))
        },
        initHomeItemPage: (params) => {
            dispatch({type: INIT_HOME_ITEM_PAGE, itemTypeName: params})
        },
        userLogin: (params) => {
            dispatch(doLoginAction(params));
        }
    }
};
const ConnectedHomeView = connect(mapStateToProps, mapDispatchToProps)(Home);
export default ConnectedHomeView;