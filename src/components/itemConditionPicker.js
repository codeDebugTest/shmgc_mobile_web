import React from 'react'
import {Modal} from 'antd-mobile'
import SegmentedTabs from './segmentedTabs'
import OtherTimePickerView from './otherTimePickerView'
import TagPickerView from './tagPickerView'
import EntPickerView from "./entPickerView";
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
            showStatusView: false,
            showTypeView: false,
            showEntView: false,
        };
        newState[menuName] = true;
        this.setState(newState);
    }

    onEntViewConfirmed = (ent) => {
        this.picker.ent = ent;
        this.setPickedValue(this.picker)
    }
    onStatusViewConfirmed = (value) => {
        this.picker.itemStatus = value;
        this.setPickedValue(this.picker)
    }
    onTypeViewConfirmed = (value) => {
        this.picker.itemType = value;
        this.setPickedValue(this.picker)
    }

    renderEntView = ()=> {
        if (this.state.showEntView) {
            return <EntPickerView marginTop={this.props.marginTop}
                                       data={this.props.ents}
                                       value={this.picker.ent}
                                       onViewCanceled={()=>this.setState({showEntView: false})}
                                       onViewConfirmed={this.onEntViewConfirmed}/>
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
