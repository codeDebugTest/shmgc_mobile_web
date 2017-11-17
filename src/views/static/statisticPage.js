import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import BottomTabBar from '../../components/bottomTabBar'
import GridBox from '../../components/gridBox'
import TimeFilterBar from '../../components/timeFilterBar'
import StaticView from '../../components/staticView'
import {routeToSettingPage} from '../../utils/router'
import {doLoadingDataAction} from './statisticPage.redux'

const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
class StatisticView extends React.Component{
    constructor(props) {
        super(props);
        this.btnItemList =[
            {name: '城建物资', icon: placeholderImg},
            {name: '公路桥梁', icon: placeholderImg},
            {name: '住总住博', icon: placeholderImg},
            {name: '上海砼', icon: placeholderImg},

            {name: '混凝土', icon: placeholderImg},
            {name: '水泥', icon: placeholderImg},
            {name: '钢材', icon: placeholderImg},
            {name: '其他', icon: ''},
        ];
    }

    renderStaticOverview = () => {
        if (this.props.storeData.loadingSuccess) {
            return <StaticView staticData={this.props.storeData}/>
        }
        return null;
    }

    componentWillMount() {
        this.props.loadData();
    }
    render () {
        return (
            <div>
                <TopNavBar title="统计" leftContent="设置" onLeftBtnClick={routeToSettingPage}/>

                <div className="main-section">
                    <GridBox column="4" data={this.btnItemList}
                         renderItem={item=>(
                             <div style={{paddingTop: '10px'}}>
                                 <img src={item.icon} style={{width:'50px', height: '50px'}}/>
                                 <p style={{fontSize:'13px'}} className="grid-p">{item.name}</p>
                             </div>
                         )}
                         onClick={this.onGridClick}
                    />

                    <WhiteSpace/>
                    <TimeFilterBar marginTop="222px"/>
                    <WhiteSpace/>

                    <p className="grid-p">截止十月数据统计总览</p>

                    {this.renderStaticOverview()}
                </div>
                <BottomTabBar selectedTab='statistic'/>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        storeData: state.statistic
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingDataAction(params));
        }
    }
}

const ConnectedStatisticView = connect(mapStateToProps, mapDispatchToProps)(StatisticView);
export default ConnectedStatisticView;