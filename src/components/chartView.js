/**
 * Created by code on 2017/12/15.
 */
import React from 'react'
import {WingBlank} from 'antd-mobile'
import G2 from '@antv/g2'
import {G2Config, chartContainerCfg} from '../utils/chartConfig'

export default class ChartView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: this.getChartVisible()
        }
    }
    getChartVisible = () => {
        const chartData = this.props.chart.chartData;
        if (chartData && chartData.length > 1) {
            const firstItem = chartData[0];
            if ( firstItem[this.props.chart.fieldLeftY] >= 0 &&
                firstItem[this.props.chart.filedRightY] >= 0) {
                return true;
            }
        }
        return false;
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

    componentDidMount() {
        if (!this.state.visible) {
            return;
        }
        this.chartConfig = this.props.chart;
        this.chart = new G2.Chart({
            container: this.chartConfig.id,
            ...chartContainerCfg,
        });

        const formatter = this.formatterFactory(this.chartConfig.unit || {value: 100000000, name: '亿元'});

        const chartCfg = new G2Config(this.chart, this.chartConfig.chartData);
        chartCfg.setChartScale(this.chartConfig.fieldLeftY, this.chartConfig.aliasLeft);
        chartCfg.setChartScale(this.chartConfig.filedRightY, this.chartConfig.aliasRight);
        chartCfg.setChartAxis(this.chartConfig.fieldX);
        chartCfg.setChartAxis(this.chartConfig.fieldLeftY, null, formatter, true);
        chartCfg.setChartAxis(this.chartConfig.filedRightY, null);
        chartCfg.setChartInterval(this.chartConfig.fieldX, this.chartConfig.fieldLeftY);
        chartCfg.setChartLine(this.chartConfig.fieldX, this.chartConfig.filedRightY);
        chartCfg.setChartTooltip();
        // chartCfg.customChartlegend(isPurchase ? 'total': 'average');
        this.chart.render();
    }
    componentWillUnmount() {
        if (this.state.visible) {
            this.chart.destroy();
        }
    }

    render() {
        return (
        <div>
            {this.state.visible ?
                <WingBlank size="sm">
                    <p style={{fontSize:'12px',marginBottom:0, color: '#868585'}}>{this.props.title}</p>
                    <div id={this.props.chart.id}/>
                </WingBlank>
                : null
            }
        </div>
        )
    }
}