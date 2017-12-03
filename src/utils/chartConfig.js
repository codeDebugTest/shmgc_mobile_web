export class G2Config {
    constructor(chart, chartData, config) {
        this.chart = chart;
        this.chart.source(chartData, config);
    }
    setChartScale(field, alias, rangCfg) {
        const defaultCfg = {
            type: 'linear',
            tickCount: 5,
        };
        if (rangCfg) {
            defaultCfg.minLimit = rangCfg[field].min;
            defaultCfg.maxLimit = rangCfg[field].max;
        }
        if (alias) {
            defaultCfg.alias = alias;
        }
        this.chart.scale(field, defaultCfg)
    }
    purchaseTooltipCallback = (value) => {
        return {name: '采购金额', value: (value/10000).toFixed(2) + '万'}
    };
    purchaseAmountTooltip = (value) => {
        return {name: '采购数量', value: Number(value.toFixed(2)).toLocaleString()};
    };
    averagePriceTooltip = (value) => {
        return {name: '平均单价', value: value.toFixed(2)}
    }
    getTooltipCallbackFuc = function (nameY) {
        if (nameY === 'purchaseAmount') {
            return this.purchaseTooltipCallback;
        } else if (nameY === 'purchaseQuantity') {
            return this.purchaseAmountTooltip;
        } else if (nameY === 'averagePrice' ){
            return this.averagePriceTooltip;
        } else {
            return null;
        }
    }
    setChartInterval(nameX, nameY) {
        this.chart.interval().position(nameX + '*' + nameY).color(nameX, ['#019fe8', '#01cfe7', '#00e9c0', '#5dcf53']).tooltip(nameY, this.getTooltipCallbackFuc(nameY));
    }
    setChartLine(nameX, nameY) {
        this.chart.line().position(nameX + '*' + nameY).tooltip(nameY, this.getTooltipCallbackFuc(nameY));
        this.chart.point().position(nameX + '*' + nameY).size(4).shape('circle').style({
            stroke: '#fff',
            lineWidth: 1
        }).tooltip(nameY, this.getTooltipCallbackFuc(nameY));
    }
    setIntervalStack(fieldX, fieldY, title, color) {
        this.chart.intervalStack()
            .position(fieldY)
            .color(fieldX, color)
            .label(fieldY, {
                offset: -20,
                textStyle: {
                    rotate: 0,
                    textAlign: 'center',
                    shadowBlur: 2,
                    fill: '#000'
                }
            })
            .tooltip(fieldX+ '*'+fieldY, (item, percent) => {
                return {
                    title: title,
                    name: item,
                    value: percent + '%'
                };
            })
            .style({
                lineWidth: 1,
                stroke: '#fff'
            });
    }
    setChartTooltip() {
        this.chart.tooltip({crosshairs: {type: 'line'}});
    }
    setChartAxis(field, alias, formatter, setGrid) {
        const gridStyle ={
            type: 'line',
            lineStyle: {
                stroke: '#d9d9d9', // 网格线的颜色
                lineWidth: 1, // 网格线的粗细
                lineDash: [4, 4] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
            }
        };
        const cfg = {
            line: {
                stroke: '#d9d9d9',
                lineWidth: 2
            },
            label: {
                // offset: 25,
                textStyle: {
                    fontSize: 11
                }
            },
            grid: (setGrid ? gridStyle: null)
        };
        if (alias) {
            cfg.title = {
                // offset: 35,
                textStyle: {
                    fontSize: 11,
                    textAlign: 'center',
                    fill: '#999',
                    marginRight: 0,
                    paddingRight: 0
                }
            };
            cfg.alias = alias
        }
        if (formatter) {
            cfg.label.formatter = formatter;
        }

        this.chart.axis(field, cfg);
    }

    customChartlegend(type) {
        if (type === 'total') {
            this.chart.legend({
                custom: true,
                items: [
                    {
                        value: '柱形图-采购金额', // 图例项的文本内容
                        fill: '#3182bd',  // 该图例项 marker 的填充颜色
                        marker: 'circle'  // 该图例项 marker 的形状，参见 marker 参数的说明
                    }, {
                        value: '曲线图-项目数',
                        fill: '#fdae6b',
                        marker: 'square'
                    }
                ]
            })
        } else if (type === 'average') {
            this.chart.legend({
                custom: true,
                items: [
                    {
                        value: '柱形图-采购数量', // 图例项的文本内容
                        fill: '#3182bd',  // 该图例项 marker 的填充颜色
                        marker: 'circle'  // 该图例项 marker 的形状，参见 marker 参数的说明
                    }, {
                        value: '曲线图-采购均价',
                        fill: '#fdae6b',
                        marker: 'square'
                    }
                ]
            })
        }
    }
}

export const chartContainerCfg = {
    forceFit: true,
    height: 160,
    width: '100%',
    padding: [20, 35, 40, 52],
    background: {fill: '#fff'}
}