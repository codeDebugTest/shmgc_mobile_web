import React from 'react'
import './gridBox.css'

export default class GridBoxItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            onClick: false
        };
        this.item = this.props.item;
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
    }
    clickOver =()=> {
        setTimeout(()=> this.setState({onClick: false}), 100)
    };
    onMouseDown = ()=> {
        // this.setState({onClick: true});
    };
    onMouseUp = ()=> {
        this.props.onClick(this.item);
        // this.clickOver();
    };

    render () {
        const itemClass = this.state.onClick ? 'item active': 'item';
        return (
            <div className={itemClass} onMouseUp={()=>this.onMouseUp()} onMouseDown={this.onMouseDown}>
                {this.props.renderItem(this.item)}
            </div>
        )
    }
}
