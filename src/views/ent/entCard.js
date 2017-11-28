import React from 'react'
import {WhiteSpace, WingBlank, Card, Icon, Checkbox} from 'antd-mobile'

const CheckboxItem = Checkbox.CheckboxItem;
export default class EntCard extends React.Component{
    constructor(props) {
        super(props)
        this.ent = this.props.ent;
    }

    onCheckBoxClick =(checkBoxChecked) => {
        this.props.onSelectStateClick(this.ent.entId, checkBoxChecked);
    };
    onCardClick = ()=> {
        this.props.onNormalStateClick(this.props.ent);
    }

    getEntProjectStatic = () => {
        if (!this.ent.projectStat || this.ent.projectStat.length === 0) {
            return  [
                {
                    display: '项目总数',
                    countStr: '--'
                },{
                    display: '进行中',
                    countStr:  '--'
                }, {
                    display: '已结束',
                    countStr:  '--'
                }
            ]
        } else {
            return this.ent.projectStat
        }
    };
    getItemColor = (display) => {
        switch (display) {
            case '项目总数':
                return '#03a3d9';
            case '进行中':
                return '#f79826';
            case '已结束':
                return '#868585';
            default:
                return '';
        }
    }
    renderProjectStatic = () => {
        const projectStatic = this.getEntProjectStatic();
        const typeStyle = {fontSize: '13px',paddingTop: '5px', color: '#868585'};
        return (
            projectStatic.map((staticItem, key) => {
                return <div style={{flexGrow: 2}} key={key}>
                    <p className="half-margin-p" style={{fontSize: '16px', color: this.getItemColor(staticItem.display)}}>{staticItem.countStr}</p>
                    <p className="half-margin-p" style={typeStyle}>{staticItem.display}</p>
                </div>
            })
        )

    };
    renderCheckBox = (entId) => {
        const currentSate = this.props.currentState;
        if (currentSate === 'select') {
            return <div style={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                <CheckboxItem key={entId} style={{paddingLeft: 0}} className="no-list-line"
                              onChange={e => {e.stopPropagation(); this.onCheckBoxClick(e.target.checked)} }/>
            </div>
        }
        return null;
    }
    renderCardBody = () => {
        return <Card.Body style={{padding:'0 10px 5px'}}>
            <div style={{display:'flex', flexDirection: 'row'}}>
                {this.renderProjectStatic()}
                {this.renderCheckBox()}
            </div>
        </Card.Body>
    }
    renderCardHeader = () => {
        const title= <div style={{fontSize: '16px', color: '#03a3d9'}}>{this.ent.entName}</div>;
        return <Card.Header title={title} extra={<Icon type="right"/>} className="ent-card-header"/>
    };
    render() {
        const isNormal =  this.props.currentState === 'normal'
        return (
            <div>
                <WhiteSpace/>
                <WingBlank>
                    <div style={{borderRadius: '6px'}}>
                        <Card onClick={isNormal?()=>this.onCardClick():null} style={{paddingBottom: 0}}>
                            {this.renderCardHeader()}
                            {this.renderCardBody()}
                        </Card>
                    </div>
                </WingBlank>
                <WhiteSpace/>
            </div>
        )
    }
}
