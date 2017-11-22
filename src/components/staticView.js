import React from 'react'
import {WingBlank, WhiteSpace, Flex} from 'antd-mobile'
import {ChartMargin, getAxisRange, setIntervalPosition, setLinePosition, setAxis, getTooltipCfg} from '../utils/chartConfig'

const chartIdList = [
    {id: 'entCountChart', comment: '企业项目数采购金额'},
    {id: 'entAverageChart',comment: '企业采购数量，采购均价'},
    {id: 'cateCountChart', comment: '材料项目数，采购金额'},
    {id: 'cateAverageChart', comment: '材料采购数量，采购均价'},
    {id: 'timeChart',   comment: '时间项目数，采购金额'},
];
export default class StaticView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chartVisible: {
                entCountChart: true,
                entAverageChart: true,
                cateCountChart: true,
                cateAverageChart: true,
                timeChart: true,
            }
        }
    }

    formattedValue = (value) =>{
        if(value) {
            return value;
        } else {
            return '--';
        }
    };

    renderChart(chartId, chartData, axisConfig, nameX, nameLeftY, nameRightY, titleLeft, titleRight) {
        const firstItem =chartData[0];
        if ( firstItem[nameLeftY] && firstItem[nameRightY]) {
            const chart = this[chartId];
            chart.source(chartData, axisConfig);
            setIntervalPosition(chart, nameX, nameLeftY);
            setLinePosition(chart, nameX, nameRightY);
            setAxis(chart, nameX, nameLeftY, nameRightY);
            chart.render();
            return true;
        }
        return false
    }

    rendEntChart(chartData, chartVisible) {
        if (chartData && chartData.length > 0) {
            const axisConfig = {
                purchaseAmount: getAxisRange(11000, 15000),
                piCount: getAxisRange(90, 160)
            };
            chartVisible.entCountChart = this.renderChart('entCountChart', chartData, null, 'entName', 'purchaseAmount', 'piCount','采购金额', '项目数量');

            const axisConfig1 = {
                purchaseQuantity: getAxisRange(11000, 15000),
                averagePrice: getAxisRange(90, 160)
            };
            chartVisible.entAverageChart = this.renderChart('entAverageChart', chartData, null, 'entName', 'purchaseQuantity', 'averagePrice', '采购数量', '平均单价');
        }else {
            chartVisible.entAverageChart = false;
            chartVisible.entCountChart = false;
        }
    }
    rendCateChart(chartData, chartVisible) {
        if (chartData && chartData.length > 0) {
            const axisConfig = {
                purchaseAmount: getAxisRange(110000, 135000),
                piCount: getAxisRange(90, 160)
            };
            chartVisible.cateCountChart = this.renderChart('cateCountChart', chartData, null, 'cateName', 'purchaseAmount', 'piCount','采购金额', '项目数量');

            const axisConfig1 = {
                purchaseQuantity: getAxisRange(50, 150),
                averagePrice: getAxisRange(0, 5)
            };
            chartVisible.cateAverageChart = this.renderChart('cateAverageChart', chartData, null, 'cateName', 'purchaseQuantity', 'averagePrice', '采购数量', '平均单价');
        } else {
            chartVisible.cateCountChart = false;
            chartVisible.cateAverageChart = false;
        }
    }
    rendTimeChart(chartData, chartVisible) {
        if (chartData && chartData.length > 0) {
            const axisConfig = {
                purchaseAmount: getAxisRange(11000, 15000),
                piCount: getAxisRange(90, 160)
            };
            chartVisible.timeChart = this.renderChart('timeChart', chartData, null, 'month', 'purchaseAmount', 'piCount', '采购金额', '项目数量');
        } else {
            chartVisible.timeChart = false;
        }
    }

    componentDidMount() {
        chartIdList.map((chart) => {
            this[chart.id] = window.CreateG2Mobile({
                id: chart.id,
                margin: ChartMargin
            })
        });
        const staticData = this.props.staticData;
        const chartVisible = {};
        if (staticData) {
            this.rendEntChart(staticData.groupByEnt, chartVisible);
            this.rendCateChart(staticData.groupByCate, chartVisible);
            this.rendTimeChart(staticData.groupByTime, chartVisible);
        }
        this.setState({ chartVisible: chartVisible})
    }

    render() {
        const overview = this.props.staticData && this.props.staticData.overview;
        const chartVisible = this.state.chartVisible;
        const flexLayout = {display: 'flex'};
        const pBigStyle = {fontSize:'12px', textAlign: 'left', width: '60%'};
        const pSmallStyle = {fontSize:'12px', textAlign: 'left', width: '40%'};
        return (
            <div>
                <WingBlank>
                    <div style={flexLayout}>
                        <p style={pBigStyle}>采购金额：{this.formattedValue(overview && overview.purchaseAmountStr)}</p>
                        <p style={pSmallStyle}>项目总数：{this.formattedValue(overview && overview.piCountStr)}</p>
                    </div>
                    <div style={flexLayout}>
                        <p style={pBigStyle}>采购数量：{this.formattedValue(overview && overview.purchaseQuantityStr)}</p>
                        <p style={pSmallStyle}>采购均价：{this.formattedValue(overview && overview.averagePriceStr)}</p>
                    </div>
                </WingBlank>

                {
                    chartIdList.map((chart, key) => {
                        return (
                            chartVisible[chart.id] ?
                                <WingBlank size="sm" key={key}>
                                    <p style={{fontSize:'12px',marginBottom:0}}>{chart.comment}</p>
                                    <canvas id={chart.id} className="canvas-chart"/>
                                </WingBlank>
                                : null
                        )
                    })
                }
            </div>
        );
    }
}