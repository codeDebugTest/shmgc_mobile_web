import React from 'react'
import {Picker, List} from 'antd-mobile'
import DropDownView from './dropDownView'

export default class CutoffTimePickerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.initState()
        }
    }
    initState = () => {
        const value = this.props.value;
        if(value) {
            return {cutoffArray: value.split('-')}
        } else {
            return{cutoffArray: []}
        }
    }

    onViewCanceled = () => {
        this.setState({showView: false});
        this.props.onViewCanceled();
    }

    onViewConfirmed =() => {
        this.onViewCanceled();
        const value =  this.state.cutoffArray.join('-');
        this.props.onViewConfirmed(value);
    }

    render() {
        return(
            <DropDownView onCancel={this.onViewCanceled} onOk={this.onViewConfirmed} top={this.props.marginTop}>
               <Picker data={this.props.sourceTime} title="统计月份"  cascade={false} extra="请选择"
                   value={this.state.cutoffArray}
                   onChange={v=>this.setState({cutoffArray: v})} onOk={v=>this.setState({cutoffArray: v})}
               >
                   <List.Item arrow="horizontal">统计月份</List.Item>
               </Picker>
            </DropDownView>
        )
    }
}
