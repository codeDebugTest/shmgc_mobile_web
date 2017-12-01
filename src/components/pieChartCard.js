import React from 'react'
import {Flex, WhiteSpace} from 'antd-mobile'
import G2 from '@antv/g2'
import {G2Config} from '../utils/chartConfig'

const chartList = ['amountChart', 'quantityChart', 'piCountChart'];
const chartNameList = ['采购金额', '采购数量', '项目数'];
export default class PieChartCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartVisible: {
                amountChart: true,
                quantityChart: true,
                piCountChart: true,
            }
        }
    }

    renderChart =(chart, attr, title, color) => {
        const value = Number((this.props.staticData[attr] * 100).toFixed(2));

        if (value > 0) {
            const chartData = [
                {ent:'城建物资', count: value},
                {ent:'其他', count: 100 - value}
            ];
            const chartCfg = new G2Config(chart, chartData, {count: {formatter: value => value + '%'}});
            chart.coord('theta')
            chartCfg.setIntervalStack('ent', 'count', title, color);

            chart.render();
            return true;
        }
        return false;
    }
    createChart = () => {
        chartList.forEach((chartId) => {
            this[chartId] = new G2.Chart({
                container: this.props.id + chartId,
                forceFit: true,
                height: 100,
                width: '100%',
                padding: [5, 10,10,10]
            })
        });
    };

    componentDidMount() {
        this.createChart();

        const visible = {};
        visible.amountChart = this.renderChart(this.amountChart, 'purchaseAmount', '采购金额', ['#fbd437', '#3aa1ff']);
        visible.quantityChart = this.renderChart(this.quantityChart, 'purchaseQuantity', '采购数量', ['#fbd437', '#f2637b']);
        visible.piCountChart = this.renderChart(this.piCountChart, 'piCount', '项目数', ['#fbd437', '#4a0cbd']);

        this.setState({chartVisible: visible});
    }

    componentWillUnmount() {
        chartList.map((chartId) => {
            this[chartId].destroy();
        });
    }
    render () {
        const chartVisible = this.state.chartVisible;
        return (
        <div>
            { chartVisible.amountChart ? <WhiteSpace/> : ''}
            <Flex style={{backgroundColor: '#e9f1ea'}}>
                {chartList.map((chartId, key) => {
                    return (
                        chartVisible[chartId]
                            ? <div style={{width: '33.3%'}} key={key}>
                                <p style={{fontSize: '12px', textAlign:'center'}} className="half-margin-p">{chartNameList[key]}</p>
                                <div id={this.props.id + chartId} key={key} />
                              </div>
                            : null
                    )
                })}
            </Flex>
        </div>

        )
    }
}
