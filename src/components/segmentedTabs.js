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
                <div className="segmented-tabs">
                    { React.Children.map(this.props.children, (tab)=>{
                        return <div className="tab">{tab}</div>
                    })}
                </div>
            </WingBlank>
        )
    }
}
