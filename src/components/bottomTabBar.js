import React from 'react'
import { TabBar } from 'antd-mobile';
import {ChangeRoute} from '../utils/router'
import './bottomTabBar.css'

export default class BottomTabBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="bottom-tab-bar">
            <TabBar unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white">
                <TabBar.Item
                    title="首页"
                    key="Home"
                    icon={<div className="home-normal-icon"/>}
                    selectedIcon={<div className="home-active-icon"/>}
                    selected={this.props.selectedTab === 'home'}
                    onPress={ChangeRoute.goHomePage}
                />

                <TabBar.Item
                    title="项目"
                    key="Item"
                    icon={<div className="item-normal-icon"/>}
                    selectedIcon={<div className="item-active-icon"/>}
                    selected={this.props.selectedTab === 'purchaseItem'}
                    onPress={ChangeRoute.goPurchaseItemPage}
                />
                <TabBar.Item
                    title="企业"
                    key="Ent"
                    icon={<div className="ent-normal-icon"/>}
                    selectedIcon={<div className="ent-active-icon"/>}
                    selected={this.props.selectedTab === 'ent'}
                    onPress={ChangeRoute.goEntPage}
                />
                <TabBar.Item
                    title="统计"
                    key="statistic"
                    icon={<div className="static-normal-icon"/>}
                    selectedIcon={<div className="static-active-icon"/>}
                    selected={this.props.selectedTab === 'statistic'}
                    onPress={ChangeRoute.goStaticPage}
                />
            </TabBar>
        </div>
        )
    }
}