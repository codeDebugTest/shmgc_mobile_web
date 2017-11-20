import React from 'react';
import {Menu, NavBar} from 'antd-mobile'
import './topNavBar.css'

export default class TopNavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
                <NavBar mode="dark"
                        leftContent={this.props.leftContent}
                        onLeftClick={this.props.onLeftBtnClick}
                        rightContent={this.props.rightContent}
                        className="top-nav-bar">
                    {this.props.title}
                </NavBar>
        )
    }
}