import React from 'react'

class SectionBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        const style = {
            backgroundColor: this.props.backgroundColor || '#c6c6ce',
            lineHeight: '30px',
            paddingTop: '8px',
            color: '#fff',
            fontSize: '15px'
        };
       return (
           <div style={style}>{this.props.sectionName}</div>
       )
    }
}

export default SectionBar;