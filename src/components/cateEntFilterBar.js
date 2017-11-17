import React from 'react'
import SegmentedTabs from './segmentedTabs'
import DropDownPanel from './dropDownPanel'

export default class CateEntFilterBar extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            showCateMenu: false,
            showEntMenu: false,
        }
        this.showMenu = this.showMenu.bind(this)
    }
    showMenu = (menuName) => {
        const newState = {
            showCateMenu: false,
            showEntMenu: false,
        };
        newState[menuName] = true;
        this.setState(newState);
    }
    hideCateMenu = () => {
        this.setState({showCateMenu: false});
    }

    hideEntMenu = () => {
        this.setState({showEntMenu: false});
    }

    renderCateMenu =() => {

    };

    renderEntMenu = () => {
        if (this.state.showEntMenu) {
            return <DropDownPanel onCancel={this.hideEntMenu} onOk={this.hideEntMenu} top={this.props.marginTop}>
                企业选择
            </DropDownPanel>
        }
        return null;
    };

    render() {
        return (
            <div>
                <SegmentedTabs>
                    <div onClick={()=>this.showMenu('showCateMenu')}>材料</div>
                    <div onClick={()=>this.showMenu('showEntMenu')}>公司</div>
                </SegmentedTabs>

                {this.renderCateMenu()}
                {this.renderEntMenu()}
            </div>
        )
    }
}