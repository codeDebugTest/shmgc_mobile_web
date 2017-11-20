import React from 'react'
import {Flex, Icon} from 'antd-mobile'
import './itemCard.css'

const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
const runningStatus = {
    border: '2px solid #debb04',
    color: '#debb04'
}
const finishedStatus = {
    border: '2px solid #ddd',
    color: '#ddd'
}
const compareItem = {
    color: 'blue'
}
const tenderItem ={
    color: '#debb04'
}

export default class ItemCard extends React.Component {
    constructor(props) {
        super(props)
    }

    getStatusStyle = (pitStatus) => {
        if (pitStatus === '进行中') {
            return runningStatus;
        } else if (pitStatus === '已结束') {
            return finishedStatus;
        }
    };
    getTitleStyle = (piType) => {
        if( piType === '比价') {
            return compareItem
        } else if(piType === '招标') {
            return tenderItem
        }
    };

    getPiTitle = (title) => {
        return title.substring(0, 6)
    }

    render () {
        const itemIconStyle = {width:'40px', height: '40px'};
        const item = this.props.item;
        return (
            <div className="item-card">
                <div style={{width: '17%'}}>
                    <img src={placeholderImg} style={itemIconStyle}/>
                    <p style={{fontSize:'12px'}} className="no-margin-p">比价</p>
                </div>
                <div className="body">
                    <div className="content">
                        <label className="title" style={this.getTitleStyle(item.piType)}>{this.getPiTitle(item.piTitle)}......</label>
                        <button className="status" style={this.getStatusStyle(item.pitStatus)}>{item.pitStatus}</button>
                    </div>

                    <div className="basic">
                        <label>{item.entName}</label>
                        <label>{item.piProdDesc}</label>
                        <label>{item.city}</label>
                        <label>{item.cutoffTimeStr}</label>
                    </div>
                </div>
                <div className="hand-sign">
                    <Icon type="right"/>
                </div>
            </div>
        )
    }
}
