import React from 'react'
import {connect} from 'react-redux'
import {Button, WhiteSpace, WingBlank, Modal,Flex} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import GridBox from '../../components/gridBox'
import BottomTabBar from '../../components/bottomTabBar'
import TimeLocationPicker from '../../components/timeLocationPicker'
import {ChangeRoute} from '../../utils/router'
import {logoClassList, getFilterLoactions, getRequestTimeLocationCondition} from '../../utils/filterConditionConfig'

class ItemView extends React.Component{
    constructor(props) {
        super(props);
        this.filterLocations = getFilterLoactions(this.props.commonData);
        this.pickerCondition = {};
    }
    onGridClick = (ent) =>{
        // todo 跳转页面
    };

    loadStaticData = (pickerCondition) => {
        this.pickerCondition = {...pickerCondition};
/*        this.props.loadData({
            ...this.props.commonData.userInfo,
            filterCondition: getRequestTimeLocationCondition(this.pickerCondition)
        });*/
    };

    componentWillMount() {
        this.loadStaticData({});
    }
    render () {
        const imgStyle = {width:'50px', height: '50px'};
        const entLogo = (shortName) => <div className={logoClassList[shortName] ? logoClassList[shortName] : logoClassList['other']}/>;

        return (
            <div>
                <TopNavBar title="项目" leftContent={<div className="setting-icon"/>} onLeftBtnClick={ChangeRoute.goSettingPage}/>

                <div className="main-section grid-back-ground">
                    <GridBox column="4" data={this.props.commonData.subEnts}
                             renderItem={item=>(
                                 <div style={{paddingTop: '15px'}}>
                                     {item.entId ? entLogo(item.shortName): <div style={imgStyle}/>}
                                     <p style={{fontSize:'12px', color: '#fff'}}>{item.shortName}</p>
                                 </div>
                             )}
                             onItemClick={this.onGridClick}
                    />
                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="230px" tabStyle="white-style"
                                        locations={this.filterLocations}
                                        confirmCallback={this.loadStaticData}
                                        pickerCondition={this.pickerCondition}/>

                    <WhiteSpace/>
                </div>

                <BottomTabBar selectedTab='purchaseItem'/>
            </div>
        )
    }
}


const mapStateToProps = (state) =>{
    return {
        storeData: state.itemPage,
        commonData: state.login
    }
};
const mapDispatchToProps = (dispatch) => {
    return {}
}

const ConnectedItemView = connect(mapStateToProps, mapDispatchToProps)(ItemView);
export default ConnectedItemView;