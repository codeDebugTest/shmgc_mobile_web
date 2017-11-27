import React from 'react'
import {WingBlank, WhiteSpace} from 'antd-mobile'
import G2 from '@antv/g2'
import {G2Config, chartContainerCfg} from '../utils/chartConfig'

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

    formatterFactory = (unit) => {
        return (val) => {
            return (val/unit.value).toFixed(1) + unit.name;
        }
    }

    renderChart(chartId, chartData, fieldX, fieldLeftY, filedRightY, aliasLeft, aliasRight, unit, isPurchase) {
        const firstItem =chartData[0];
        if ( firstItem[fieldLeftY] >= 0 && firstItem[filedRightY] >= 0) {
            const formatter = this.formatterFactory(unit || {value: 100000000, name: '亿元'});
            const chartCfg = new G2Config(this[chartId], chartData);
            chartCfg.setChartScale(fieldLeftY, aliasLeft);
            chartCfg.setChartScale(filedRightY, aliasRight);
            chartCfg.setChartAxis(fieldX);
            chartCfg.setChartAxis(fieldLeftY, null, formatter, true);
            chartCfg.setChartAxis(filedRightY, null);
            chartCfg.setChartInterval(fieldX, fieldLeftY, isPurchase);
            chartCfg.setChartLine(fieldX, filedRightY);
            chartCfg.setChartTooltip();
            this[chartId].render();
            return true;
        }
        return false
    }

    rendEntChart(chartData, chartVisible) {
        if (chartData && chartData.length > 1) {
            chartVisible.entCountChart = this.renderChart('entCountChart', chartData, 'entName', 'purchaseAmount', 'piCount','采购金额', '项目数量', null, true);
            chartVisible.entAverageChart = this.renderChart('entAverageChart', chartData,'entName', 'purchaseQuantity', 'averagePrice', '采购数量', '平均单价', {value: 10000, name: '万'});
        }else {
            chartVisible.entAverageChart = false;
            chartVisible.entCountChart = false;
        }
    }
    rendCateChart(chartData, chartVisible) {
        if (chartData && chartData.length > 1) {
            chartVisible.cateCountChart = this.renderChart('cateCountChart', chartData, 'cateName', 'purchaseAmount', 'piCount','采购金额', '项目数量', null, true);
            chartVisible.cateAverageChart = this.renderChart('cateAverageChart', chartData, 'cateName', 'purchaseQuantity', 'averagePrice', '采购数量', '平均单价',{value: 10000, name: '万'});
        } else {
            chartVisible.cateCountChart = false;
            chartVisible.cateAverageChart = false;
        }
    }
    rendTimeChart(chartData, chartVisible) {
        if (chartData && chartData.length > 1) {
            chartVisible.timeChart = this.renderChart('timeChart', chartData, 'month', 'purchaseAmount', 'piCount', '采购金额', '项目数量', null, true);
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
        const labelStyle = {fontSize:'12px', textAlign: 'left', color: '#757575'};
        const valueStyle = {fontSize:'13px', color: '#03a3d9'};

        return (
            <div>
                <WingBlank>
                    <div style={flexLayout}>
                        <div style={{width: '58%', ...labelStyle}}>采购金额：<label style={valueStyle}>{this.formattedValue(overview && overview.purchaseAmountStr)}</label></div>
                        <div style={{width: '42%', ...labelStyle}}>项目总数：<label style={valueStyle}>{this.formattedValue(overview && overview.piCountStr)}</label></div>
                    </div>
                    <WhiteSpace/>
                    <div style={flexLayout}>
                        <div style={{width: '58%', ...labelStyle}}>采购数量：<label style={valueStyle}>{this.formattedValue(overview && overview.purchaseQuantityStr)}</label></div>
                        <div style={{width: '42%', ...labelStyle}}>采购均价：<label style={valueStyle}>{this.formattedValue(overview && overview.averagePriceStr)}</label></div>
                    </div>
                    <WhiteSpace/>
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