import React from 'react'
import {WingBlank} from 'antd-mobile'
import G2 from '@antv/g2'
import {G2Config, chartContainerCfg, ChartMargin, getAxisRange, setIntervalPosition, setLinePosition, setAxis} from '../utils/chartConfig'

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

    renderChart(chartId, chartData, fieldX, fieldLeftY, filedRightY, aliasLeft, aliasRight) {
        const firstItem =chartData[0];
        if ( firstItem[fieldLeftY] && firstItem[filedRightY]) {
            const formatter = (val) => {
                return (val/100000000).toFixed(1) + '亿元'
            };
            const chartCfg = new G2Config(this[chartId], chartData);
            chartCfg.setChartScale(fieldLeftY, aliasLeft);
            chartCfg.setChartScale(filedRightY, aliasRight);
            chartCfg.setChartAxis(fieldX);
            chartCfg.setChartAxis(fieldLeftY, aliasLeft, formatter, true);
            chartCfg.setChartAxis(filedRightY, aliasRight);
            chartCfg.setChartInterval(fieldX, fieldLeftY);
            chartCfg.setChartLine(fieldX, filedRightY);
            chartCfg.setChartTooltip();
            this[chartId].render();
            return true;
        }
        return false
    }

    rendEntChart(chartData, chartVisible) {
        if (chartData && chartData.length > 0) {
            chartVisible.entCountChart = this.renderChart('entCountChart', chartData, 'entName', 'purchaseAmount', 'piCount','采购金额', '项目数量');
            chartVisible.entAverageChart = this.renderChart('entAverageChart', chartData,'entName', 'purchaseQuantity', 'averagePrice', '采购数量', '平均单价');
        }else {
            chartVisible.entAverageChart = false;
            chartVisible.entCountChart = false;
        }
    }
    rendCateChart(chartData, chartVisible) {
        if (chartData && chartData.length > 0) {
            chartVisible.cateCountChart = this.renderChart('cateCountChart', chartData, 'cateName', 'purchaseAmount', 'piCount','采购金额', '项目数量');
            chartVisible.cateAverageChart = this.renderChart('cateAverageChart', chartData, 'cateName', 'purchaseQuantity', 'averagePrice', '采购数量', '平均单价');
        } else {
            chartVisible.cateCountChart = false;
            chartVisible.cateAverageChart = false;
        }
    }
    rendTimeChart(chartData, chartVisible) {
        if (chartData && chartData.length > 0) {
            chartVisible.timeChart = this.renderChart('timeChart', chartData, 'month', 'purchaseAmount', 'piCount', '采购金额', '项目数量');
        } else {
            chartVisible.timeChart = false;
        }
    }

    componentDidMount() {
        chartIdList.map((chart) => {
            this[chart.id] =  new G2.Chart({
                container: chart.id,
                ...chartContainerCfg,
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
                                    <div id={chart.id}></div>
                                </WingBlank>
                                : null
                        )
                    })
                }
            </div>
        );
    }
}