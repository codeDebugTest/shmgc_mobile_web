import React from 'react'
import {Picker, List, Modal, Flex, Tag} from 'antd-mobile'
import SegmentedTabs from './segmentedTabs'
import DropDownView from './dropDownView'
import QuarterPickerView from './quarterPickerView'
import OtherTimePickerView from './otherTimePickerView'

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
        this.onQuarterViewConfirm = this.onQuarterViewConfirm.bind(this);
        this.onLocationMenuConfirm = this.onLocationMenuConfirm.bind(this);
        this.onOtherTimeViewConfirm = this.onOtherTimeViewConfirm.bind(this);
    }
    showMenu = (menuName) => {
        const newState = {
            showCutoffMenu: false,
            showQuarterView: false,
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
    onQuarterViewConfirm =(value) => {
        this.setState({quarter: value});
    }
    onLocationMenuConfirm = () => {
        this.hideMenu('showLocationMenu')
    };

    onOtherTimeViewConfirm = (value) => {
        if (value.endTime <= value.startTime) {
            Modal.alert('', '结束时间必须大于起始时间！', [{text: '确定', style: {height: '40px', lineHeight: '40px'}}]);
        } else {
            this.setState({otherTime: value})
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

    renderQuarterView = ()=> {
        if (this.state.showQuarterView) {
            return <QuarterPickerView marginTop={this.props.marginTop}
                                      value={this.state.quarter}
                                      onViewCanceled={()=>this.setState({showQuarterView: false})}
                                      onViewConfirmed={this.onQuarterViewConfirm}
            />
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

    renderOtherTimeView = () => {
        if (this.state.showOtherTimeView) {
            return <OtherTimePickerView marginTop={this.props.marginTop}
                                        sourceTime={otherTime}
                                        value={this.state.otherTime}
                                        onViewCanceled={()=>this.setState({showOtherTimeView: false})}
                                        onViewConfirmed={this.onOtherTimeViewConfirm}
                />
        }
        return null
    }

    render() {
        return (
            <div>
                <SegmentedTabs>
                    <div onClick={()=>this.showMenu('showCutoffMenu')} className={this.state.showCutoffMenu ? 'active':''}>截止十月</div>
                    <div onClick={()=>this.showMenu('showQuarterView')} className={this.state.showQuarterView ? 'active':''}>季度</div>
                    <div onClick={()=> this.showMenu('showOtherTimeView')} className={this.state.showOtherTimeView ? 'active':''}>其他时间</div>
                    <div onClick={()=>this.showMenu('showLocationMenu')} className={this.state.showLocationMenu ? 'active':''}>上海</div>
                </SegmentedTabs>

                {this.renderCutoffMenu()}
                {this.renderQuarterView()}
                {this.renderOtherTimeView()}
                {this.renderLocationMenu()}
            </div>
        )
    }
}