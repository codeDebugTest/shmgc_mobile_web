import React from 'react'
import {WhiteSpace, WingBlank, Card, Icon, Checkbox} from 'antd-mobile'

const CheckboxItem = Checkbox.CheckboxItem;
export default class EntCard extends React.Component{
    constructor(props) {
        super(props)
        this.ent = this.props.ent;
        this.onClick = this.onClick.bind(this);
    }

    onClick =(checkBoxChecked) => {
        this.props.onEntCardClick(this.ent.entId, checkBoxChecked);
    };

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
    }
    renderProjectStatic = () => {
        const projectStatic = this.getEntProjectStatic();
        return (
            projectStatic.map((staticItem, key) => {
                return <div style={{flexGrow: 2}} key={key}>
                    <p className="grid-p" style={{fontSize: '14px'}}>{staticItem.display}</p>
                    <p className="grid-p" style={{fontSize: '14px'}}>{staticItem.countStr}</p>
                </div>
            })
        )

    };
    renderCheckBox = (entId) => {
        const currentSate = this.props.currentState;
        if (currentSate === 'select') {
            return <div style={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                <CheckboxItem key={entId} style={{paddingLeft: 0}} className="no-list-line"
                              onChange={e => {e.stopPropagation(); this.onClick(e.target.checked)} }/>
            </div>
        }
        return null;
    }
    renderCardBody = () => {
        return <Card.Body style={{padding:'0 10px'}}>
            <div style={{display:'flex', flexDirection: 'row'}}>
                {this.renderProjectStatic()}
                {this.renderCheckBox()}
            </div>
        </Card.Body>
    }
    renderCardHeader = () => {
        const title= <div style={{fontSize: '14px'}}>{this.ent.entName}</div>;
        return <Card.Header title={title} extra={<Icon type="right"/>}/>
    };
    render() {
        const isNormal =  this.props.currentState === 'normal'
        return (
            <div>
                <WhiteSpace/>
                <WingBlank>
                    <div style={{border:'1px solid #3a9ee4'}}>
                        <Card onClick={isNormal?()=>this.onClick():null} style={{paddingBottom: 0}}>
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
