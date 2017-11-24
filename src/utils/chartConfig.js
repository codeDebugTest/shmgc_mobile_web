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
    }
    setChartInterval(nameX, nameY, isPurchase) {
        this.chart.interval().position(nameX + '*' + nameY).color(nameX).tooltip(nameY, (isPurchase?this.purchaseTooltipCallback: null));
    }
    setChartLine(nameX, nameY) {
        this.chart.line().position(nameX + '*' + nameY).shape('smooth');
        this.chart.point().position(nameX + '*' + nameY).size(4).shape('circle').style({
            stroke: '#fff',
            lineWidth: 1
        });
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
                    value: percent * 100 + '%'
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
                lineDash: [4, 4 ] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
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
}

export const chartContainerCfg = {
    forceFit: true,
    height: 200,
    width: '100%',
    padding: [20, 40, 45, 50],
}