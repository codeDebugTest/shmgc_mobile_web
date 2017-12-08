import React from 'react'
import G2 from '@antv/g2'
import {G2Config, chartContainerCfg} from '../utils/chartConfig'

export default class TimeTrendChart extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            visible: true
        }
    }

    componentDidMount() {
        this.chart = new G2.Chart({
            container: 'timeTrendChart',
            ...chartContainerCfg,
        });

        const charData = this.props.charData;
        if(charData && charData.length > 0) {
            this.setState({visible: true});

            const formatter = (val) => {
                return (val/100000000).toFixed(1) + '亿元'
            };
            const chartCfg = new G2Config(this.chart, charData);
            chartCfg.setChartScale('purchaseAmount', '采购金额');
            chartCfg.setChartScale( 'piCount', '采购项目数');
            chartCfg.setChartAxis('month');
            chartCfg.setChartAxis('purchaseAmount', null, formatter, true);
            chartCfg.setChartAxis('piCount', null);
            chartCfg.setChartInterval('month', 'purchaseAmount');
            chartCfg.setChartLine('month', 'piCount');
            chartCfg.setChartTooltip();
            // chartCfg.customChartlegend('total');
            this.chart.render();
        } else {
            this.setState({visible: false});
        }
    }
    componentWillUnmount() {
        this.chart.destroy();
    }
    render() {
        return (
            <div>
                { this.state.visible ? <div id="timeTrendChart"/> : null}
            </div>
        )
    }
}
