import React from 'react'
import {connect} from 'react-redux'
import {doLoadingAction} from './homePage.redux'
import {Grid, Card, Icon, WingBlank, Flex} from 'antd-mobile'
import SectionBar from '../../components/sectionBar'
import TopNavBar from '../../components/topNavBar'
import BottomTabBar from '../../components/bottomTabBar'
import {ChartMargin, setIntervalPosition, setLinePosition, setAxis, getAxisRange} from '../../utils/chartConfig'
import  './homePage.css'
import {routeToSettingPage, routeToHomeStatic} from '../../utils/router'

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.cardOnClickHandler = this.cardOnClickHandler.bind(this)
        this.entChart = null;
    }

    cardOnClickHandler = ()=>{
        // todo 路由跳转
        routeToHomeStatic();
        console.log('card on click')
    };

    renderEntChart(entChartData) {
        const axisConfig = {
            purchaseAmount: getAxisRange(11000, 15000),
            piCount: getAxisRange(90, 160)
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
                                <p>{item.cateName}</p>
                                <p>{item.amountStr}</p>
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
        this.props.loadData();
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
            this.renderEntChart(entChartData)
        }
    }

    render () {
        const homeData = this.props.storeData;
        const amountStyle = {textAlign: 'center', fontSize:'26px', color: '#d00d0d'};
        return (
            <div>
                <TopNavBar title="上海城建物资股份有限公司" leftContent="设置" onLeftBtnClick={routeToSettingPage}/>
                <div className="main-section">
                    <SectionBar sectionName="项目数据概览" backgroundColor={'#55ace8'}/>
                    <Grid data={homeData.projectStat} columnNum={3} square={false} hasLine={false} renderItem={
                        dataItem => (
                            <div>
                                <p className="small-margin-p" style={{fontSize: '26px', color: '#eff305'}}>{dataItem.count}</p>
                                <p className="small-margin-p" style={{fontSize: '14px', color: '#e7eaec'}}>{dataItem.type}</p>
                            </div>
                        )
                    }/>

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
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingAction(params))
        }
    }
};

const ConnectedHomeView = connect(mapStateToProps, mapDispatchToProps)(Home);
export default ConnectedHomeView;