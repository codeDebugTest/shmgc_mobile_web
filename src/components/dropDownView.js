import React from 'react'
import  './dropDownView.css'


export default class DropDownView extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="drop-down-panel" style={{top: this.props.top}}>
                <div className="panel">
                    <div className="body">
                        {this.props.children}
                    </div>
                    <div className="bottom">
                        <a onClick={this.props.onCancel}>取消</a>
                        <a className="primary" onClick={this.props.onOk}>确定</a>
                    </div>
                </div>
                <div className="panel-mask" onClick={this.props.onCancel}/>
            </div>
        )
    }
}
