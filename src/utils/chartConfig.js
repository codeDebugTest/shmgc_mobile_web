export const ChartMargin = [15, 40, 30, 40];
export function setIntervalPosition(chart, nameX, nameY) {
    chart.interval().position(nameX + '*' + nameY).color(nameX);
}

export function setLinePosition(chart, nameX, nameY) {
    // 绘制线图
    const lineColor = '#0a0de6';
    const pointColor = '#4555e6';
    chart.line().position(nameX + '*' + nameY).color(lineColor).size(2).shape('smooth');
    chart.point().position(nameX + '*' + nameY).color(pointColor);
}

export function setAxis(chart, nameX, nameLeftY, nameRightY) {
    chart.axis(nameX, {
        label: {fontSize: 11},
        grid: null
    });
    chart.axis(nameLeftY, {
        label: {fontSize: 11}
    });
    chart.axis(nameRightY, {
        label: {fontSize: 11},
        grid: null
    })
}

export function getAxisRange(min, max) {
    return {
        type: 'linear',
        min: min,
        max: max
    }
}

export function getTooltipCfg() {
    return {
        offset: 15, // 偏移量，设置 tooltip 显示位置距离 x 轴方向上的偏移
        crosshairs: true, // 是否展示 tooltip 的辅助线，默认为 false，不展示
        crossLine: {
            stroke: '#666', // 辅助线的颜色
            lineWidth: 2, // 辅助线的宽度
            lineDash: [2, 3] // 设置虚线样式
        }, // crosshairs 为 true 时，为辅助线设置样式
        padding: [5, 5, 5, 5],
    }
}