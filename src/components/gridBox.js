import React from 'react'
import GridBoxItem from './gridBoxItem'
import  './gridBox.css'

export default class GridBox extends React.Component{
    constructor(props) {
        super(props)
        this.column = this.props.cloumn || 4;
    }

    sliceArray = ()=> {
        const gridLines = [];
        const sourceData = this.props.data;
        if (sourceData && sourceData.length > 0) {
            let index = 0, length = sourceData.length;
            while (index < length) {
                let endIndex = index + this.column;
                gridLines.push(this.props.data.slice(index, (endIndex < length ? endIndex : length)));
                index += 4;
            }
        }
        return gridLines
    };


    renderGridLine = (data, lineKey) => {
        while (data.length < this.column) {
            data.push({});
        }
        return (
            <div className="grid-box" key={lineKey}>
                {
                    data.map((item, key) => {
                        return <GridBoxItem item={item} key={key} renderItem={this.props.renderItem} onClick={this.props.onClick}/>
                    })
                }
            </div>
        )
    };

    renderGrid () {
        const gridLines = this.sliceArray();
        if (gridLines.length > 0) {
            return (
                gridLines.map((line, key) => {
                    return this.renderGridLine(line, key)
                })
            )
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.renderGrid()}
            </div>
        )
    }
}
