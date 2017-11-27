import React from 'react'
import {Picker, List} from 'antd-mobile'
import DropDownView from './dropDownView'

export default class OtherTimePickerView extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            showView: true,
            ...this.initState()
        }
        this.onViewCanceled = this.onViewCanceled.bind(this);
        this.onViewConfirmed = this.onViewConfirmed.bind(this);
    }
    initState = () => {
        const value = this.props.value;
        if(value && value.startTime && value.endTime) {
            return {
                startTimeArray: value.startTime.split('-'),
                endTimeArray: value.endTime.split('-'),
            }
        } else {
            return{
                startTimeArray: [],
                endTimeArray: [],
            }
        }
    }
    onViewCanceled = () => {
        this.setState({showView: false});
        this.props.onViewCanceled();
    }

    onViewConfirmed =() => {
        this.onViewCanceled();
        const value = {
            startTime: this.state.startTimeArray.join('-'),
            endTime: this.state.endTimeArray.join('-'),
            startTimeKey: Number(this.state.startTimeArray.join('')),
            endTimeKey: Number(this.state.endTimeArray.join(''))
        };
        this.props.onViewConfirmed(value);
    }

    renderView =()=> {
        if (this.state.showView) {
            return (
                <DropDownView onCancel={this.onViewCanceled} onOk={this.onViewConfirmed} top={this.props.marginTop}>
                    <Picker data={this.props.sourceTime} title="选择时间" cascade={false} extra="请选择"
                            value={this.state.startTimeArray} format={values => values.join('-')}
                            onChange={v=>this.setState({startTimeArray: v})} onOk={v=>this.setState({startTimeArray: v})}
                    >
                        <List.Item arrow="horizontal">起始时间</List.Item>
                    </Picker>

                    <Picker data={this.props.sourceTime} title="选择时间" cascade={false} extra="请选择"
                            value={this.state.endTimeArray} format={values => values.join('-')}
                            onChange={v=>this.setState({endTimeArray: v})} onOk={v=>this.setState({endTimeArray: v})}
                    >
                        <List.Item arrow="horizontal">结束时间</List.Item>
                    </Picker>
                </DropDownView>
            )
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.renderView()}
            </div>
        )
    }
}