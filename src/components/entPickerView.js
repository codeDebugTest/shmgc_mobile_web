import React from 'react'
import {Tag, Flex} from 'antd-mobile'
import DropDownView from "./dropDownView";


export default class EntPickerView extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            showView: true,
            pickedEnt: this.props.value
        }
    }

    onPickedChanged = (selected, value) => {
        if(selected) {
            this.setState({pickedEnt: value})
        } else {
            this.setState({pickedEnt: null})
        }
    };

    onViewCanceled = () => {
        this.setState({showView: false});
        this.props.onViewCanceled();
    };

    onViewConfirmed = () => {
        this.onViewCanceled();
        this.props.onViewConfirmed(this.state.pickedEnt);
    };

    renderView =() => {
        if(this.state.showView) {
            const tagStyle ={margin: '5px'};
            const pickedEnt = this.state.pickedEnt;
            return (
                <DropDownView onCancel={this.onViewCanceled} onOk={this.onViewConfirmed} top={this.props.marginTop}>
                    <Flex wrap="wrap">
                        {this.props.data.map((ent) => {
                            return (
                                <Tag key={ent.id} style={tagStyle}
                                     selected={ent.entId === (pickedEnt && pickedEnt.entId)}
                                     onChange={(selected) => this.onPickedChanged(selected, ent)}
                                >{ent.entName}</Tag>
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
