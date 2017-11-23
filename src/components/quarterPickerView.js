import React from 'react'
import {Flex, Tag} from 'antd-mobile'
import DropDownView from './dropDownView'

const quarters = [
    {
        label: '第一季度',
        value: 1
    },{
        label: '第二季度',
        value: 2
    },{
        label: '第三季度',
        value: 3
    },{
        label: '第四季度',
        value: 4
    },
]
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
            const selectedValue = this.state.quarter && this.state.quarter.value;
            return (<DropDownView onCancel={this.onViewCanceled} onOk={this.onViewConfirmed} top={this.props.marginTop}>
                <Flex wrap="wrap">
                    {quarters.map((quarter) => {
                        return (
                            <Tag key={quarter.value} style={tagStyle} selected={selectedValue === quarter.value}
                                 onChange={(selected)=>this.onQuarterSelectedChange(selected, quarter)}>
                                {quarter.label}
                            </Tag>
                        )
                    })}
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
