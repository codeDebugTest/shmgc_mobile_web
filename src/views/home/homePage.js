import React from 'react'
import {connect} from 'react-redux'
import {doLoadingAction} from './homePage.redux'
import {Grid, Card, Icon, WingBlank, Flex} from 'antd-mobile'
import SectionBar from '../../components/sectionBar'
import TopNavBar from '../../components/topNavBar'
import BottomTabBar from '../../components/bottomTabBar'
import {ChartMargin, setIntervalPosition, setLinePosition, setAxis, getAxisRange} from '../../utils/chartConfig'
import {ChangeRoute} from '../../utils/router'
import {INIT_HOME_ITEM_PAGE} from './homeItem.redux'
import  './homePage.css'

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.cardOnClickHandler = this.cardOnClickHandler.bind(this);
        this.onGridItemClick = this.onGridItemClick.bind(this);
        this.entChart = null;
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

    renderEntChart(entChartData, axisRange) {
        const axisConfig = {
            purchaseAmount: {type: 'linear', ...axisRange.purchaseAmount},
            piCount: {type: 'linear', ...axisRange.piCount}
        };

        this.entChart.source(entChartData, axisConfig);

        setIntervalPosition(this.entChart, 'entName', 'purchaseAmount');             // x轴，左Y轴
        setLinePosition(this.entChart, 'entName', 'piCount');                       // x轴，右Y轴
        setAxis(this.entChart, 'entName', 'purchaseAmount', 'piCount');     // x轴，左Y轴，右Y轴

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
        //todo get loginName from login store
        this.props.loadData({loginName: 'admin', password: '123'});
    }

    componentDidMount() {
        this.entChart = new window.CreateG2Mobile({
            id: 'entChart',
            margin: ChartMargin
        });
    }

    componentDidUpdate() {
        const entChartData = this.props.storeData && this.props.storeData.groupByEnt;
        if (entChartData && entChartData.length > 0) {
            this.renderEntChart(entChartData, this.props.storeData.axisRange)
        }
    }

    render () {
        const homeData = this.props.storeData;
        const amountStyle = {textAlign: 'center', fontSize:'26px', color: '#d00d0d'};
        return (
            <div>
                <TopNavBar title="上海城建物资股份有限公司" leftContent="设置" onLeftBtnClick={ChangeRoute.goSettingPage}/>
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
                        <canvas id="entChart" className="canvas-chart"/>
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
        storeData: state.homePage
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingAction(params))
        },
        initHomeItemPage: (params) => {
            dispatch({type: INIT_HOME_ITEM_PAGE, itemTypeName: params})
        }
    }
};
const ConnectedHomeView = connect(mapStateToProps, mapDispatchToProps)(Home);
export default ConnectedHomeView;