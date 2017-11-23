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
                    <Tag style={tagStyle} selected={this.state.quarter === 1} onChange={(selected)=>this.onQuarterSelectedChange(selected, 1)}>第一季度</Tag>
                    <Tag style={tagStyle} selected={this.state.quarter === 2} onChange={(selected)=>this.onQuarterSelectedChange(selected, 2)}>第二季度</Tag>
                    <Tag style={tagStyle} selected={this.state.quarter === 3} onChange={(selected)=>this.onQuarterSelectedChange(selected, 3)}>第三季度</Tag>
                    <Tag style={tagStyle} selected={this.state.quarter === 4} onChange={(selected)=>this.onQuarterSelectedChange(selected, 4)}>第四季度</Tag>
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
