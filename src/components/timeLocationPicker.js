import React from 'react'
import {Picker, List, Modal, Flex, Tag} from 'antd-mobile'
import SegmentedTabs from './segmentedTabs'
import DropDownView from './dropDownView'

const otherTime =[
    [{label: '2017', value: '2017'}],
    [
        {label: '1月', value:'01'},
        {label: '2月', value:'02'},
        {label: '3月', value:'03'},
        {label: '4月', value:'04'},
        {label: '5月', value:'05'},
        {label: '6月', value:'06'},
        {label: '7月', value:'07'},
        {label: '8月', value:'08'},
        {label: '9月', value:'09'},
        {label: '10月', value:'10'},
        {label: '11月', value:'11'},
        {label: '12月', value:'12'},
    ]
]
export default class  TimeLocationPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startTimeArray: [],
            endTimeArray: [],
            quarter: null
        };

        this.onCutoffMenuConfirm = this.onCutoffMenuConfirm.bind(this);
        this.onQuarterlyMenuConfirm = this.onQuarterlyMenuConfirm.bind(this);
        this.onLocationMenuConfirm = this.onLocationMenuConfirm.bind(this);
        this.onOtherTimeMenuConfirm = this.onOtherTimeMenuConfirm.bind(this);
    }
    showMenu = (menuName) => {
        const newState = {
            showCutoffMenu: false,
            showQuarterlyMenu: false,
            showLocationMenu: false,
            showOtherTimeMenu: false
        };
        newState[menuName] = true;
        this.setState(newState);
    }
    hideMenu = (menuName) => {
        const newState = {};
        newState[menuName] = false;
        this.setState(newState);
    }

    onCutoffMenuConfirm = () => {
        this.hideMenu('showCutoffMenu')
    }
    onQuarterlyMenuConfirm =() => {
        this.hideMenu('showQuarterlyMenu')
    }
    onLocationMenuConfirm = () => {
        this.hideMenu('showLocationMenu')
    };

    onOtherTimeMenuConfirm = () => {
        this.hideMenu('showOtherTimeMenu');

        const startTime = this.state.startTimeArray.join('-');
        const endTime = this.state.endTimeArray.join('-');
        if (endTime <= startTime) {
            Modal.alert('', '结束时间必须大于起始时间！', [{text: '确定', style: {height: '40px', lineHeight: '40px'}}]);
        } else {
            this.props.onSelectedOtherTime(startTime, endTime);
        }
    }

    renderCutoffMenu = ()=> {
        if (this.state.showCutoffMenu) {
            return <DropDownView onCancel={()=> this.hideMenu('showCutoffMenu')} onOk={this.onCutoffMenuConfirm} top={this.props.marginTop}>
                截止时间选择
            </DropDownView>
        }
        return null;
    };

    onQuarterSelectedChange = (selected, value) => {
        if(selected) {
            this.setState({quarter: value})
        } else {
            this.setState({quarter: null})
        }
    }
    renderQuarterlyMenu = ()=> {
        if (this.state.showQuarterlyMenu) {
            const tagStyle ={margin: '5px'};
            return <DropDownView onCancel={()=> this.hideMenu('showQuarterlyMenu')} onOk={this.onQuarterlyMenuConfirm} top={this.props.marginTop}>
                <Flex wrap="wrap">
                    <Tag style={tagStyle} selected={this.state.quarter === 'one'} onChange={(selected)=>this.onQuarterSelectedChange(selected, 'one')}>第一季度</Tag>
                    <Tag style={tagStyle} selected={this.state.quarter === 'two'} onChange={(selected)=>this.onQuarterSelectedChange(selected, 'two')}>第二季度</Tag>
                    <Tag style={tagStyle} selected={this.state.quarter === 'three'} onChange={(selected)=>this.onQuarterSelectedChange(selected, 'three')}>第三季度</Tag>
                    <Tag style={tagStyle} selected={this.state.quarter === 'four'} onChange={(selected)=>this.onQuarterSelectedChange(selected, 'four')}>第四季度</Tag>
                </Flex>
            </DropDownView>
        }
        return null;
    }
    renderLocationMenu = ()=> {
        if (this.state.showLocationMenu) {
            return <DropDownView onCancel={()=> this.hideMenu('showLocationMenu')} onOk={this.onLocationMenuConfirm} top={this.props.marginTop}>
                地区选择
            </DropDownView>
        }
        return null;
    };

    renderOtherTimeMenu = () => {
        if (this.state.showOtherTimeMenu) {
            return <DropDownView onCancel={()=> this.hideMenu('showOtherTimeMenu')} onOk={this.onOtherTimeMenuConfirm} top={this.props.marginTop}>
                <Picker data={otherTime} title="选择时间" cascade={false} extra="请选择"
                        value={this.state.startTimeArray} format={values => values.join('-')}
                        onChange={v=>this.setState({startTimeArray: v})} onOk={v=>this.setState({startTimeArray: v})}
                >
                    <List.Item arrow="horizontal">起始时间</List.Item>
                </Picker>

                <Picker data={otherTime} title="选择时间" cascade={false} extra="请选择"
                        value={this.state.endTimeArray} format={values => values.join('-')}
                        onChange={v=>this.setState({endTimeArray: v})} onOk={v=>this.setState({endTimeArray: v})}
                >
                    <List.Item arrow="horizontal">结束时间</List.Item>
                </Picker>
            </DropDownView>
        }
        return null
    }

    render() {
        return (
            <div>
                <SegmentedTabs>
                    <div onClick={()=>this.showMenu('showCutoffMenu')} className={this.state.showCutoffMenu ? 'active':''}>截止十月</div>
                    <div onClick={()=>this.showMenu('showQuarterlyMenu')} className={this.state.showQuarterlyMenu ? 'active':''}>季度</div>
                    <div onClick={()=> this.showMenu('showOtherTimeMenu')} className={this.state.showOtherTimeMenu ? 'active':''}>其他时间</div>
                    <div onClick={()=>this.showMenu('showLocationMenu')} className={this.state.showLocationMenu ? 'active':''}>上海</div>
                </SegmentedTabs>

                {this.renderCutoffMenu()}
                {this.renderQuarterlyMenu()}
                {this.renderOtherTimeMenu()}
                {this.renderLocationMenu()}
            </div>
        )
    }
}