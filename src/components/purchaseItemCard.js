import React from 'react'
import {Icon} from 'antd-mobile'
import './purchaseItemCard.css'

const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
const runningStatus = {
    border: '2px solid #debb04',
    color: '#debb04'
}
const finishedStatus = {
    border: '2px solid #ddd',
    color: '#ddd'
}
const compareItemColor = {
    color: 'blue'
}
const tenderItemColor ={
    color: '#debb04'
}

export default class PurchaseItemCard extends React.Component {
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
    getTitleColor = (piType) => {
        if( piType === '比价') {
            return compareItemColor
        } else if(piType === '招标') {
            return tenderItemColor
        }
    };

    getPiTitle = (title) => {
        return title.substring(0, 9)
    };

    getPiLogo = (piType) => {
        if (piType === '比价') {
            return 'compare-logo'
        } else if (piType === '招标') {
            return 'invite-logo'
        } else if (piType === '协议') {
            return 'agreement-logo'
        }
    }


    render () {
        const item = this.props.item;
        return (
            <div className="item-card">
                <div className="item-type-logo">
                    <div className={this.getPiLogo(item.piType)}/>
                    <p style={{...this.getTitleColor(item.piType)}}>{item.piType}</p>
                </div>
                <div className="body">
                    <div className="content">
                        <label className="title" style={this.getTitleColor(item.piType)}>{this.getPiTitle(item.piTitle)} ...</label>
                        <button className="status" style={this.getStatusStyle(item.pitStatus)}>{item.pitStatus}</button>
                    </div>

                    <div className="basic">
                        <label>{item.entName}</label>
                        <label>{item.piProdDesc}</label>
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
