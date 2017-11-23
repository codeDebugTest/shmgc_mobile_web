import React from 'react'
import {Modal} from 'antd-mobile'
import SegmentedTabs from './segmentedTabs'
import QuarterPickerView from './quarterPickerView'
import OtherTimePickerView from './otherTimePickerView'
import LocationPickerView from './locationPickerView'
import CutoffTimePickerView from './cutoffTimePickerView'

const cutoffTimes =[
    [
        {label: '一月', value:'1'},
        {label: '二月', value:'2'},
        {label: '三月', value:'3'},
        {label: '四月', value:'4'},
        {label: '五月', value:'5'},
        {label: '六月', value:'6'},
        {label: '七月', value:'7'},
        {label: '八月', value:'8'},
        {label: '九月', value:'9'},
        {label: '十月', value:'10'},
        {label: '十一月', value:'11'},
        {label: '十二月', value:'12'},
    ]
]
const otherTime =[
    [{label: '2017', value: '2017'}],
    [
        {label: '1月', value:'1'},
        {label: '2月', value:'2'},
        {label: '3月', value:'3'},
        {label: '4月', value:'4'},
        {label: '5月', value:'5'},
        {label: '6月', value:'6'},
        {label: '7月', value:'7'},
        {label: '8月', value:'8'},
        {label: '9月', value:'9'},
        {label: '10月', value:'10'},
        {label: '11月', value:'11'},
        {label: '12月', value:'12'},
    ]
]

export default class  TimeLocationPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state ={};
        this.picker = this.initPicker();

        this.onCutoffViewConfirm = this.onCutoffViewConfirm.bind(this);
        this.onQuarterViewConfirm = this.onQuarterViewConfirm.bind(this);
        this.onLocationViewConfirm = this.onLocationViewConfirm.bind(this);
        this.onOtherTimeViewConfirm = this.onOtherTimeViewConfirm.bind(this);
    }
    initPicker = () => {
        if(this.props.pickerCondition) {
            return {...this.props.pickerCondition};
        } else {
            return {
                cutoffTime: '10',
                otherTime: null,
                quarter: null,
                location: null,
            };
        }
    }
    showMenu = (menuName) => {
        const newState = {
            showCutoffView: false,
            showQuarterView: false,
            showLocationView: false,
            showOtherTimeView: false
        };
        newState[menuName] = true;
        this.setState(newState);
    }

    onCutoffViewConfirm = (value) => {
        this.picker.cutoffTime = value;
    }
    onQuarterViewConfirm =(value) => {
        this.picker.quarter = value;
        this.props.confirmCallback(this.picker);
    }

    onLocationViewConfirm = (value) => {
        this.picker.location = value;
        this.props.confirmCallback(this.picker);
    };

    onOtherTimeViewConfirm = (value) => {
        if (value.endTime <= value.startTime) {
            Modal.alert('', '结束时间必须大于起始时间！', [{text: '确定', style: {height: '40px', lineHeight: '40px'}}]);
        } else {
            this.picker.otherTime =value;
        }
    }

    renderCutoffView = ()=> {
        if (this.state.showCutoffView) {
            return <CutoffTimePickerView marginTop={this.props.marginTop}
                                         sourceTime={cutoffTimes}
                                         value={this.picker.cutoffTime}
                                         onViewCanceled={()=>this.setState({showCutoffView: false})}
                                         onViewConfirmed={this.onCutoffViewConfirm}
            />
        }
        return null;
    };

    renderQuarterView = ()=> {
        if (this.state.showQuarterView) {
            return <QuarterPickerView marginTop={this.props.marginTop}
                                      value={this.picker.quarter}
                                      onViewCanceled={()=>this.setState({showQuarterView: false})}
                                      onViewConfirmed={this.onQuarterViewConfirm}
            />
        }
        return null;
    }
    renderLocationView = ()=> {
        if (this.state.showLocationView) {
            return <LocationPickerView marginTop={this.props.marginTop}
                                       data={this.props.locations}
                                       value={this.picker.location}
                                       onViewCanceled={()=>this.setState({showLocationView: false})}
                                       onViewConfirmed={this.onLocationViewConfirm}/>
        }
        return null;
    };

    renderOtherTimeView = () => {
        if (this.state.showOtherTimeView) {
            return <OtherTimePickerView marginTop={this.props.marginTop}
                                        sourceTime={otherTime}
                                        value={this.picker.otherTime}
                                        onViewCanceled={()=>this.setState({showOtherTimeView: false})}
                                        onViewConfirmed={this.onOtherTimeViewConfirm}
                />
        }
        return null
    };

    getCutoffTabName = () => {
        const index = Number(this.picker.cutoffTime);
        return '截止' + cutoffTimes[0][index -1].label;
    }
    render() {
        const locationValue = this.picker.location && this.picker.location.value;
        return (
            <div>
                <SegmentedTabs>
                    <div onClick={()=>this.showMenu('showCutoffView')} className={this.state.showCutoffView ? 'active':''}>{this.getCutoffTabName()}</div>
                    <div onClick={()=>this.showMenu('showQuarterView')} className={this.state.showQuarterView ? 'active':''}>季度</div>
                    <div onClick={()=> this.showMenu('showOtherTimeView')} className={this.state.showOtherTimeView ? 'active':''}>其他时间</div>
                    <div onClick={()=>this.showMenu('showLocationView')}
                         className={this.state.showLocationView ? 'active':''}>{locationValue || '全国'}</div>
                </SegmentedTabs>

                {this.renderCutoffView()}
                {this.renderQuarterView()}
                {this.renderOtherTimeView()}
                {this.renderLocationView()}
            </div>
        )
    }
}