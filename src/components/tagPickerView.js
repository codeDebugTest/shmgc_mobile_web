import React from 'react'
import {Flex, Tag} from 'antd-mobile'
import DropDownView from './dropDownView'

export default class TagPickerView extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            showView: true,
            pickedItem: this.props.value
        }
    }

    onPickedChanged = (selected, value) => {
        if(selected) {
            this.setState({pickedItem: value})
        } else {
            this.setState({pickedItem: null})
        }
    };

    onViewCanceled = () => {
        this.setState({showView: false});
        this.props.onViewCanceled();
    };

    onViewConfirmed = () => {
        this.onViewCanceled();
        this.props.onViewConfirmed(this.state.pickedItem);
    };

    renderView =() => {
        if(this.state.showView) {
            const tagStyle ={margin: '5px'};
            const pickedItem = this.state.pickedItem;
            return (
                <DropDownView onCancel={this.onViewCanceled} onOk={this.onViewConfirmed} top={this.props.marginTop}>
                    <Flex wrap="wrap">
                        {this.props.data.map((item) => {
                            return (
                                <Tag key={item.id} style={tagStyle}
                                     selected={item.id === (pickedItem && pickedItem.id)}
                                     onChange={(selected) => this.onPickedChanged(selected, item)}
                                >{item.value}</Tag>
                            )
                        })}
                    </Flex>
                </DropDownView>
            )
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