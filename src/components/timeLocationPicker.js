import React from 'react'
import {Modal} from 'antd-mobile'
import SegmentedTabs from './segmentedTabs'
import QuarterPickerView from './quarterPickerView'
import OtherTimePickerView from './otherTimePickerView'
import LocationPickerView from './locationPickerView'
import CutoffTimePickerView from './cutoffTimePickerView'
import {otherTimeList} from '../utils/filterConditionConfig'

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
    [{label: '2017', value: '2017'},{label: '2018', value: '2018'}],
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
        this.state ={picker: this.initPicker(), showView: null};

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
        this.setState({showView: menuName});
    }

    setPickedValue = (picker) => {
        this.setState({picker: picker});
        this.props.confirmCallback(picker);
    }
    onCutoffViewConfirm = (value) => {
        this.setPickedValue({
            cutoffTime: value,
            location: this.state.picker.location
        });
    }
    onQuarterViewConfirm =(value) => {
        this.setPickedValue({
            quarter: value,
            location: this.state.picker.location
        });
    }
    onLocationViewConfirm = (value) => {
        const picker = {...this.state.picker};
        picker.location = value;
        this.setPickedValue(picker);
    };
    onOtherTimeViewConfirm = (value) => {
        if (value.endTimeKey <= value.startTimeKey) {
            Modal.alert('', '结束时间必须大于起始时间！', [{text: '确定', style: {height: '40px', lineHeight: '40px'}}]);
        } else {
            this.setPickedValue({
                otherTime: value,
                location: this.state.picker.location
            });
        }
    };

    renderCutoffView = ()=> {
        if (this.state.showView === 'cutoffTime') {
            return <CutoffTimePickerView marginTop={this.props.marginTop}
                                         sourceTime={cutoffTimes}
                                         value={this.state.picker.cutoffTime}
                                         onViewCanceled={()=>this.setState({showView: null})}
                                         onViewConfirmed={this.onCutoffViewConfirm}
            />
        }
        return null;
    };
    renderQuarterView = ()=> {
        if (this.state.showView === 'quarter') {
            return <QuarterPickerView marginTop={this.props.marginTop}
                                      value={this.state.picker.quarter}
                                      onViewCanceled={()=>this.setState({showView: null})}
                                      onViewConfirmed={this.onQuarterViewConfirm}
            />
        }
        return null;
    }
    renderLocationView = ()=> {
        if (this.state.showView === 'location') {
            return <LocationPickerView marginTop={this.props.marginTop}
                                       data={this.props.locations}
                                       value={this.state.picker.location}
                                       onViewCanceled={()=>this.setState({showView: null})}
                                       onViewConfirmed={this.onLocationViewConfirm}/>
        }
        return null;
    };
    renderOtherTimeView = () => {
        if (this.state.showView === 'otherTime') {
            return <OtherTimePickerView marginTop={this.props.marginTop}
                                        sourceTime={otherTimeList}
                                        value={this.state.picker.otherTime}
                                        onViewCanceled={()=>this.setState({showView: null})}
                                        onViewConfirmed={this.onOtherTimeViewConfirm}
                />
        }
        return null
    };

    getCutoffTabName = (cutoffTime) => {
        if (cutoffTime) {
            const index = Number(cutoffTime);
            return cutoffTimes[0][index -1].label;
        }
        return '月份';
    };
    getQuarterTabName = (quarter) => {
        if (quarter) {
            return quarter.label;
        }
        return '季度'
    };
    getOtherTimeTabName = (otherTime) => {
        if (otherTime) {
            return otherTime.startTime.replace('-', '.').substring(2) + '-' + otherTime.endTime.replace('-', '.').substring(2)
        }
        return '其他时间'
    }
    getTimeTabClass = (tabName) => {
        if (this.state.showView === tabName || (this.state.picker[tabName] && !this.state.showView)) {
            return 'active';
        }
        return ''
    };

    render() {
        const locationValue = this.state.picker.location && this.state.picker.location.value;
        return (
            <div>
                <SegmentedTabs backgroundStyle={this.props.tabStyle}>
                    <div onClick={()=>this.showMenu('cutoffTime')}
                         className={this.getTimeTabClass('cutoffTime')}>
                        {this.getCutoffTabName(this.state.picker.cutoffTime)}
                    </div>
                    <div onClick={()=>this.showMenu('quarter')}
                         className={this.getTimeTabClass('quarter')}>
                        {this.getQuarterTabName(this.state.picker.quarter)}
                    </div>
                    <div onClick={()=> this.showMenu('otherTime')}
                         className={this.getTimeTabClass('otherTime')}>
                        {this.getOtherTimeTabName(this.state.picker.otherTime)}
                    </div>

                    {
                        this.props.noLocation
                            ? null
                            : <div onClick={()=>this.showMenu('location')}
                                   className={this.state.showView === 'location' ? 'active':''}>
                                {locationValue || '全国'}
                              </div>
                    }
                </SegmentedTabs>

                {this.renderCutoffView()}
                {this.renderQuarterView()}
                {this.renderOtherTimeView()}
                {this.renderLocationView()}
            </div>
        )
    }
}