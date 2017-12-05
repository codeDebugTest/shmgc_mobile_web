import React from 'react'
import {Modal} from 'antd-mobile'
import SegmentedTabs from './segmentedTabs'
import OtherTimePickerView from './otherTimePickerView'
import LocationPickerView from './locationPickerView'
import CatePickerView from "./catePickerView";
import {otherTimeList, getCateTitleByCondition} from '../utils/filterConditionConfig'

export default class TrendConditionPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state ={};
        this.picker = this.props.pickedCondition ||{}
        this.showMenu = this.showMenu.bind(this)
    }
    showMenu = (menuName) => {
        const newState = {
            showCateView: false,
            showTimeView: false,
            showLocationView: false,
        };
        newState[menuName] = true;
        this.setState(newState);
    }

    onTimeViewConfirmed = (value)=> {
        if (value.endTimeKey <= value.startTimeKey) {
            Modal.alert('', '结束时间必须大于起始时间！', [{text: '确定', style: {height: '40px', lineHeight: '40px'}}]);
        } else {
            this.picker.otherTime = value;
            this.props.confirmCallback(this.picker);
        }
    }
    onCateViewConfirmed = (cate)=> {
        this.picker.cate = cate;
        this.props.confirmCallback(this.picker);
    }
    onLocationViewConfirmed = (value) => {
        this.picker.location = value;
        this.setPickedValue(this.picker)
    }

    renderLocationView = ()=> {
        if (this.state.showLocationView) {
            return <LocationPickerView marginTop={this.props.marginTop}
                                       data={this.props.locations}
                                       value={this.picker.location}
                                       onViewCanceled={()=>this.setState({showLocationView: false})}
                                       onViewConfirmed={this.onLocationViewConfirmed}/>
        }
        return null;
    };
    renderOtherTimeView = () => {
        if (this.state.showTimeView) {
            return <OtherTimePickerView marginTop={this.props.marginTop}
                                        sourceTime={otherTimeList}
                                        value={this.picker.otherTime}
                                        onViewCanceled={()=>this.setState({showTimeView: false})}
                                        onViewConfirmed={this.onTimeViewConfirmed}
            />
        }
        return null
    };
    renderCateView = () => {
        if (this.state.showCateView) {
            return <CatePickerView marginTop={this.props.marginTop}
                                   data = {this.props.categories}
                                   value ={this.picker.cate}
                                   onViewCanceled={()=> this.setState({showCateView: false})}
                                   onViewConfirmed={this.onCateViewConfirmed}
            />
        }
        return null
    }

    getPickedCate = ()=> {
        return getCateTitleByCondition(this.picker.cate);
    }
    getOtherTimeTabName = () => {
        if (this.picker.otherTime) {
            return this.picker.otherTime.startTime.replace('-', '.').substring(2) + '-' + this.picker.otherTime.endTime.replace('-', '.').substring(2)
        }
        return '其他时间'
    }
    render() {
        const locationValue = this.picker.location && this.picker.location.value;
        return (
            <div>
                <SegmentedTabs >
                    <div onClick={()=>this.showMenu('showLocationView')}
                         className={this.state.showLocationView ? 'active': ''}>
                        {locationValue || '全国'}
                    </div>

                    <div onClick={()=> this.showMenu('showTimeView')}
                         className={this.state.showTimeView ? 'active': ''}>
                        {this.getOtherTimeTabName()}
                    </div>

                    <div onClick={()=>this.showMenu('showCateView')}
                         className={this.state.showCateView ? 'active': ''}
                    >
                        {this.getPickedCate() || '材料'}
                    </div>
                </SegmentedTabs>
                {this.renderCateView()}
                {this.renderLocationView()}
                {this.renderOtherTimeView()}
            </div>
        )
    }
}
