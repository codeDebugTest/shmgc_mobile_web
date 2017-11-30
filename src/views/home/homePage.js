import React from 'react'
import {connect} from 'react-redux'
import G2 from '@antv/g2'
import {doLoadingAction} from './homePage.redux'
import {Grid, Card, Icon, WingBlank, Flex, WhiteSpace} from 'antd-mobile'
import SectionBar from '../../components/sectionBar'
import TopNavBar from '../../components/topNavBar'
import BottomTabBar from '../../components/bottomTabBar'
import {G2Config, chartContainerCfg} from '../../utils/chartConfig'
import {ChangeRoute, sendMsgToRN} from '../../utils/router'
import {INIT_HOME_ITEM_PAGE} from './homeItem.redux'
import {doLoginAction, SET_TOKEN} from '../login.redux'
import  './homePage.css'

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.cardOnClickHandler = this.cardOnClickHandler.bind(this);
        this.onGridItemClick = this.onGridItemClick.bind(this);
        this.getUserInfo();
    }
    getUserInfo = () => {
        const query = this.props.location.query;
        if (query && query.token) {
            this.props.setUserToken(query.token);
        }
    }
    onGridItemClick = (gridItem) => {
        this.props.initHomeItemPage(gridItem.display);
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
        chartCfg.setChartAxis('purchaseAmount', null, formatter, true);
        chartCfg.setChartAxis('piCount', null);
        chartCfg.setChartInterval('entName', 'purchaseAmount', true);
        chartCfg.setChartLine('entName', 'piCount');
        chartCfg.setChartTooltip();
        // chartCfg.customChartlegend('total');
        this.entChart.render();
    }

    getCateImg = (cateName) => {
        switch (cateName){
            case '混凝土':
                return 'concrete-img';
            case '水泥':
                return 'cement-img';
            case '钢材':
                return 'steel-img'
        }
    };
    renderCateStat() {
        const cateData = this.props.storeData && this.props.storeData.amountOfCate;
        if (cateData && cateData.length > 0) {
            return (
                <Flex>
                {
                    cateData.map((item, key) => {
                        return (
                            <div className="category-div" key={key}>
                                <div style={{display: 'flex', justifyContent: 'center', margin: '12px 0 10px'}}>
                                    <img className={this.getCateImg(item.cateName)}/>
                                    <label style={{fontSize: '15px', marginLeft: '5px',color:'#888'}}>{item.cateName}</label>
                                </div>
                                <p style={{fontSize: '15px', color: '#0c99db'}}>{item.amountStr}</p>
                            </div>
                        )
                    })
                }
                </Flex>
            )
        }
        return ''
    }

    getProjectItemColor = (display) => {
        switch (display) {
            case '进行中':
                return 'small-margin-p running-project';

            case '项目总数':
                return 'small-margin-p total-project';

            case '已结束':
                return 'small-margin-p finished-project';

            default:
                return 'small-margin-p type-project';
        }
    }
    componentWillMount() {
        if (!this.props.commonData.loginSuccess) {
            const loginInfo = {loginName: 'zhougang', password: '123456'};
            this.props.userLogin(loginInfo, ()=> this.props.loadData(this.props.commonData.userInfo));
        } else {
            this.props.loadData(this.props.commonData.userInfo);
            sendMsgToRN({title: this.props.commonData.entName});
        }
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
        const amountStyle = {textAlign: 'center', fontSize:'26px', color: '#f7663b', fontWeight: 'bold'};
        return (
            <div>
                <TopNavBar title={this.props.commonData.entName} leftContent={<div className="setting-icon"/>} onLeftBtnClick={ChangeRoute.goSettingPage}/>
                <div className="main-section">
                    <div className="grid-back-ground">
                        <SectionBar sectionName="项目数据概览" backgroundColor='inherit'/>
                        <Grid data={homeData.projectStat} columnNum={3} square={false} hasLine={false} className="no-back-ground"
                              renderItem={
                                  dataItem => (
                                      <div>
                                          <p className="small-margin-p" style={{paddingBottom: '5px', fontSize: '12px', color: '#90e3fa'}}>{dataItem.display}</p>

                                          <p className={this.getProjectItemColor(dataItem.display)}
                                             style={{fontSize: '26px'}}>{dataItem.countStr}</p>
                                      </div>
                                  )
                              }
                              onClick ={this.onGridItemClick}
                        />
                    </div>

                    <Card onClick={this.cardOnClickHandler}>
                        <Card.Header title={(<div style={{fontSize:'16px'}}>企业概览数据</div>)} extra={(<Icon type="right"/>)}/>
                        <Card.Body>
                            <div style={amountStyle}>￥{homeData.totalAmountStr}</div>
                        </Card.Body>
                        <Card.Footer content={'采购总金额'}/>
                    </Card>

                    <div id="entChart"/>
                    <WhiteSpace className="gap"/>
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
        userLogin: (params, callback) => {
            dispatch(doLoginAction(params, callback));
        },
        setUserToken: (token) => {
            dispatch({type:SET_TOKEN, data: token});
        }
    }
};
const ConnectedHomeView = connect(mapStateToProps, mapDispatchToProps)(Home);
export default ConnectedHomeView;