import React from 'react'
import {WingBlank} from 'antd-mobile'
import './segmentedTabs.css'

export default class SegmentedTabs extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <WingBlank>
                <div className={"segmented-tabs " + (this.props.backgroundStyle || '')}>
                    { React.Children.map(this.props.children, (tab)=>{
                        if (tab) {
                            return <div className="tab" style={this.props.style}>{tab}</div>
                        }
                    })}
                </div>
            </WingBlank>
        )
    }
}
