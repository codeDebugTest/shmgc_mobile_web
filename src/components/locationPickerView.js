import React from 'react'
import {Flex, Tag} from 'antd-mobile'
import DropDownView from './dropDownView'

export default class LocationPickerView extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            showView: true,
            pickedLocation: this.props.value
        }
    }

    onPickedChanged = (selected, value) => {
        if(selected) {
            this.setState({pickedLocation: value})
        } else {
            this.setState({pickedLocation: null})
        }
    };

    onViewCanceled = () => {
        this.setState({showView: false});
        this.props.onViewCanceled();
    };

    onViewConfirmed = () => {
        this.onViewCanceled();
        this.props.onViewConfirmed(this.state.pickedLocation);
    };

    renderView =() => {
        if(this.state.showView) {
            const tagStyle ={margin: '5px'};
            const pickedLocation = this.state.pickedLocation;
            return (
                <DropDownView onCancel={this.onViewCanceled} onOk={this.onViewConfirmed} top={this.props.marginTop}>
                    <Flex wrap="wrap">
                        {this.props.data.map((location) => {
                            return (
                                <Tag key={location.id} style={tagStyle}
                                     selected={location.id === (pickedLocation && pickedLocation.id)}
                                     onChange={(selected) => this.onPickedChanged(selected, location)}
                                >{location.value}</Tag>
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