import React from 'react'
import GridBoxItem from './gridBoxItem'
import  './gridBox.css'

export default class GridBox extends React.Component{
    constructor(props) {
        super(props);
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
                        return <GridBoxItem item={item} key={lineKey*this.column +key}
                                            renderItem={this.props.renderItem} onClick={()=>this.props.onItemClick(item)}/>
                    })
                }
            </div>
        )
    };

    render() {
        const gridLines = this.sliceArray();
        return (
            <div className="grid-back-ground">
                {
                    gridLines.map((line, key) => {
                        return this.renderGridLine(line, key)
                    })
                }
            </div>
        )
    }
}
