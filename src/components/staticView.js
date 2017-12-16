import React from 'react'
import {WingBlank, WhiteSpace} from 'antd-mobile'
import ChartView from '../components/chartView'

export default class StaticView extends React.Component {
    constructor(props) {
        super(props);
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

    transformFoldData(data, keyField, foldField, foldFieldName) {
        const result =[];
        data.forEach(function (item, index) {
            let obj = {};
            obj[keyField] = item[keyField];
            obj.value = item[foldField];
            obj.dataTypeName = foldFieldName;
            result.push(obj)
        });
        return result;
    }
    renderEntGroup(chartData) {
        const chart ={
            id: 'entCountChart',
            chartData: chartData,
            fieldX: 'entName',
            fieldLeftY: 'purchaseAmount',
            filedRightY: 'piCount',
            aliasLeft: '采购金额',
            aliasRight: '项目数量',
        }
        const chart2 = {
            id: 'entAverageChart',
            chartData: chartData,
            fieldX: 'entName',
            fieldLeftY: 'purchaseQuantity',
            fieldRightY: 'averagePrice',
            aliasLeft: '采购数量',
            aliasRight: '平均单价',
            unit: {value: 10000, name: '万'}
        };

        return [
            <ChartView key={chart.id} chart={chart} title="企业采购金额，采购项目"/>,
            <ChartView key={chart2.id} chart={chart2} title="企业采购数量，采购均价"/>
        ];
    }

    renderCateGroup(chartData) {
        const chart ={
            id: 'cateCountChart',
            chartData: chartData,
            fieldX: 'cateName',
            fieldLeftY: 'purchaseAmount',
            filedRightY: 'piCount',
            aliasLeft: '采购金额',
            aliasRight: '项目数量',
        }

        const chart2 = {
            id: 'cateAverageChart',
            chartData: chartData,
            fieldX: 'cateName',
            fieldLeftY: 'purchaseQuantity',
            fieldRightY: 'averagePrice',
            aliasLeft: '采购数量',
            aliasRight: '平均单价',
            unit: {value: 10000, name: '万'}
        };

        return [
            <ChartView key={chart.id} chart={chart} title="材料采购金额，采购项目"/>,
            <ChartView key={chart2.id} chart={chart2} title="材料采购数量，采购均价"/>
        ];
    }

    renderTimeGroup(chartData) {
        const chart ={
            id: 'timeChart',
            chartData: chartData,
            fieldX: 'month',
            fieldLeftY: 'purchaseAmount',
            filedRightY: 'piCount',
            aliasLeft: '采购金额',
            aliasRight: '项目数量',
        }
        return <ChartView chart={chart} title="采购金额，采购项目时间走势"/>
    }
    renderChartGroup() {
        const staticData = this.props.staticData;
        if (staticData) {
            return (
                <div>
                    { this.renderEntGroup(staticData.groupByEnt)}
                    { this.renderCateGroup(staticData.groupByCate)}
                    { this.renderTimeGroup(staticData.groupByTime)}
                </div>
            )
        }
        return null;
    }

    render() {
        const overview = this.props.staticData && this.props.staticData.overview;
        const flexLayout = {display: 'flex'};
        const labelStyle = {fontSize:'12px', textAlign: 'left', color: '#868585'};
        const valueStyle = {fontSize:'14px', color: '#03a3d9',fontWeight: '600'};

        return (
            <div>
                <p style={{color: '#868585'}}>{(this.props.title || '') + '统计概览'}</p>
                <WingBlank>
                    <div style={flexLayout}>
                        <div style={{width: '58%', ...labelStyle}}>
                            采购金额：
                            <label style={valueStyle}>{this.formattedValue(overview && overview.purchaseAmountStr)}</label>
                            {overview.purchaseAmountUnitStr ? overview.purchaseAmountUnitStr : ''}
                        </div>
                        <div style={{width: '42%', ...labelStyle}}>
                            项目总数：
                            <label style={valueStyle}>{this.formattedValue(overview && overview.piCountStr)}</label>
                            {overview.piCountUnitStr ? overview.piCountUnitStr : ''}
                        </div>
                    </div>
                    <WhiteSpace/>
                    <div style={flexLayout}>
                        <div style={{width: '58%', ...labelStyle}}>
                            采购数量：
                            <label style={valueStyle}>{this.formattedValue(overview && overview.purchaseQuantityStr)}</label>
                            {overview.purchaseQuantityUnitStr ? overview.purchaseQuantityUnitStr : ''}
                        </div>
                        <div style={{width: '42%', ...labelStyle}}>
                            采购均价：
                            <label style={valueStyle}>{this.formattedValue(overview && overview.averagePriceStr)}</label>
                            {overview.averagePriceUnitStr ? overview.averagePriceUnitStr : ''}
                        </div>
                    </div>
                    <WhiteSpace/>
                </WingBlank>

                {this.renderChartGroup()}
            </div>
        );
    }
}