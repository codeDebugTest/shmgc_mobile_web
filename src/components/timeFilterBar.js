import React from 'react'
import SegmentedTabs from './segmentedTabs'
import DropDownPanel from './dropDownPanel'

export default class  TimeFilterBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCutoffMenu: false,
            showQuarterlyMenu: false,
            showLocationMenu: false
        };
        this.hideCutoffMenu = this.hideCutoffMenu.bind(this);
        this.hideLocationMenu = this.hideLocationMenu.bind(this);
        this.hideQuarterlyMenu = this.hideQuarterlyMenu.bind(this);
        this.showMenu = this.showMenu.bind(this)
    }
    showMenu = (menuName) => {
        const newState = {
            showCutoffMenu: false,
            showQuarterlyMenu: false,
            showLocationMenu: false
        };
        newState[menuName] = true;
        this.setState(newState);
    }
    hideCutoffMenu = () => {
        this.setState({showCutoffMenu: false});
    }

    hideQuarterlyMenu = () => {
        this.setState({showQuarterlyMenu: false});
    }
    hideLocationMenu = () => {
        this.setState({showLocationMenu: false});
    };
    renderCutoffMenu = ()=> {
        if (this.state.showCutoffMenu) {
            return <DropDownPanel onCancel={this.hideCutoffMenu} onOk={this.hideCutoffMenu} top={this.props.marginTop}>
                截止时间选择
            </DropDownPanel>
        }
        return null;
    }
    renderQuarterlyMenu = ()=> {
        if (this.state.showQuarterlyMenu) {
            return <DropDownPanel onCancel={this.hideQuarterlyMenu} onOk={this.hideQuarterlyMenu} top={this.props.marginTop}>
                季度选择
            </DropDownPanel>
        }
        return null;
    }
    renderLocationMenu = ()=> {
        if (this.state.showLocationMenu) {
            return <DropDownPanel onCancel={this.hideLocationMenu} onOk={this.hideLocationMenu} top={this.props.marginTop}>
                地区选择
            </DropDownPanel>
        }
        return null;
    }
    render() {
        return (
            <div>
                <SegmentedTabs>
                    <div onClick={()=>this.showMenu('showCutoffMenu')}>截止十月</div>
                    <div onClick={()=>this.showMenu('showQuarterlyMenu')}>季度</div>
                    <div>其他时间</div>
                    <div onClick={()=>this.showMenu('showLocationMenu')}>上海</div>
                </SegmentedTabs>

                {this.renderCutoffMenu()}
                {this.renderQuarterlyMenu()}
                {this.renderLocationMenu()}
            </div>
        )
    }
}