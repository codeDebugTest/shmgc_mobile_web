import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import GridBox from '../../components/gridBox'
import BottomTabBar from '../../components/bottomTabBar'
import TrendConditionPicker from '../../components/trendConditionPicker'
import {ChangeRoute, sendMsgToRN, ROUTE_PATH} from '../../utils/router'
import {getFilterLocations, logoClassList, getDefaultTimeCondition} from '../../utils/filterConditionConfig'

const logoBtns=[
    {name: '道路桥梁'},
    {name: '地下工程'},
    {name: '海绵城市'},
    {name: '健康建筑'},
    {name: '绿色建筑'},
    {name: '绿色生产'},
    {name: '清洁能源'},
]
class DiscoveryView extends React.Component {
    constructor(props) {
        super(props)
        this.filterLocations = getFilterLocations(this.props.commonData);
        this.pickerCondition = {};
    }

    onGridClick=() => {

    }

    loadData = (pickerCondition) => {
        this.pickerCondition = {...pickerCondition};
/*        this.props.loadData({
            ...this.props.commonData.userInfo,
        });*/
    };

    componentWillMount() {
        this.loadData({...getDefaultTimeCondition()});
        sendMsgToRN({title: '绿智汇阳光采购平台'})
    }
    render() {
        const hideHeader = this.props.commonData.hideHeader;
        const imgStyle = {width:'50px', height: '50px'};
        const gridItemStyle = {display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15px'};
        return (
            <div>
                <TopNavBar title="绿智汇阳光采购平台"
                           hideHeader={hideHeader}
                           leftContent={<div className="setting-icon"/>}
                           onLeftBtnClick={ChangeRoute.goSettingPage}/>

                <div className={"main-section " + (hideHeader ? 'no-top gap': 'gap')}>
                    <GridBox column="4" noBackGround={true}
                             data={logoBtns}
                             renderItem={item=>(
                                 <div style={gridItemStyle}>
                                     {item.name ? <div className={logoClassList[item.name]}/>: <div style={imgStyle}/>}
                                     <p style={{fontSize:'12px', color: '#008ae6'}}>{item.name}</p>
                                 </div>
                             )}
                             onItemClick={this.onGridClick}
                    />

                    <WhiteSpace/>

                    <div style={{padding: '10px 0', backgroundColor: '#fff'}}>
                        <TrendConditionPicker marginTop="240px"
                                              locations={this.filterLocations}
                                              pickerCondition={this.pickerCondition}/>
                    </div>
                </div>

                <BottomTabBar selectedTab={ROUTE_PATH.DISCOVERY}/>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        storeData: state.discovery,
        commonData: state.login
    }
}

const mapDispatchToProps = function (dispatch) {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryView);