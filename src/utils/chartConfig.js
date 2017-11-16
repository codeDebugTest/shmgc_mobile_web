export const ChartMargin = [15, 40, 30, 40];
export function setIntervalPosition(chart, nameX, nameY) {
    chart.interval().position(nameX + '*' + nameY).color(nameX);
}

export function setLinePosition(chart, nameX, nameY) {
    const lineColor = '#0ae60a';
    const pointColor = '#0ae60a';
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