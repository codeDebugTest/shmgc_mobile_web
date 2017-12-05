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
    onMouseDown = ()=> {
        // this.setState({onClick: true});
    };
    onMouseUp = ()=> {
        this.props.onClick(this.item);
        // this.clickOver();
    };
    onClickHandler = ()=> {
        this.props.onItemClick(this.item);
    };

    render () {
        const itemClass = this.state.onClick ? 'item active': 'item';
        return (
            <div className={itemClass} onClick={()=>this.onClickHandler()}
                 style={{flexShrink: 0, flexGrow:0, width:'25%'}}>
                {this.props.renderItem(this.item)}
            </div>
        )
    }
}
