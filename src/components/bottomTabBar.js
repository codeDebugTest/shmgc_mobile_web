import React from 'react'
import {browserHistory} from 'react-router'
import { TabBar } from 'antd-mobile';
import './bottomTabBar.css'

export default class BottomTabBar extends React.Component {
    constructor(props) {
        super(props);

        this.onTabSelected = this.onTabSelected.bind(this);
    }

    onTabSelected = (tab) =>{
        browserHistory.replace({pathname: tab});
    };
    render() {
        return (
        <div className="bottom-tab-bar">
            <TabBar unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white">
                <TabBar.Item
                    title="首页"
                    key="Home"
                    icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}/>}
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}/>}
                    selected={this.props.selectedTab === 'home'}
                    onPress={() => {this.onTabSelected('home')}}
                >
                </TabBar.Item>
                <TabBar.Item
                    title="项目"
                    key="Item"
                    icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}/>}
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}/>}
                    selected={this.props.selectedTab === 'purchaseItem'}
                    onPress={() => {this.onTabSelected('purchaseItem')}}
                >
                </TabBar.Item>
                <TabBar.Item
                    title="企业"
                    key="Ent"
                    icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}/>}
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}/>}
                    selected={this.props.selectedTab === 'ent'}
                    onPress={() => {this.onTabSelected('ent')}}
                >
                </TabBar.Item>
                <TabBar.Item
                    title="统计"
                    key="statistic"
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                    selected={this.props.selectedTab === 'statistic'}
                    onPress={() => {this.onTabSelected('statistic')}}
                >
                </TabBar.Item>
            </TabBar>
        </div>
        )
    }
}