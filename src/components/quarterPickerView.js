import React from 'react'
import {Flex, Tag} from 'antd-mobile'
import DropDownView from './dropDownView'

export default class QuarterPickerView extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            quarter: this.props.value,
            showView: true
        }
        this.onViewCanceled = this.onViewCanceled.bind(this);
        this.onViewConfirmed = this.onViewConfirmed.bind(this);
    }

    onQuarterSelectedChange = (selected, value) => {
        if(selected) {
            this.setState({quarter: value})
        } else {
            this.setState({quarter: null})
        }
    };

    onViewCanceled = () => {
        this.setState({showView: false});
        this.props.onViewCanceled();
    };

    onViewConfirmed = () => {
        this.onViewCanceled();
        this.props.onViewConfirmed(this.state.quarter);
    };

    renderView = () => {
        if (this.state.showView) {
            const tagStyle ={margin: '5px'};
            return (<DropDownView onCancel={this.onViewCanceled} onOk={this.onViewConfirmed} top={this.props.marginTop}>
                <Flex wrap="wrap">
                    <Tag style={tagStyle} selected={this.state.quarter === 'one'} onChange={(selected)=>this.onQuarterSelectedChange(selected, 'one')}>第一季度</Tag>
                    <Tag style={tagStyle} selected={this.state.quarter === 'two'} onChange={(selected)=>this.onQuarterSelectedChange(selected, 'two')}>第二季度</Tag>
                    <Tag style={tagStyle} selected={this.state.quarter === 'three'} onChange={(selected)=>this.onQuarterSelectedChange(selected, 'three')}>第三季度</Tag>
                    <Tag style={tagStyle} selected={this.state.quarter === 'four'} onChange={(selected)=>this.onQuarterSelectedChange(selected, 'four')}>第四季度</Tag>
                </Flex>
            </DropDownView>)
        } else {
            return null
        }
    }
    render () {
        return (
            <div>
                {this.renderView()}
            </div>
        )
    }
}
