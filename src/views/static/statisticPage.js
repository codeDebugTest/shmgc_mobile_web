import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import BottomTabBar from '../../components/bottomTabBar'
import GridBox from '../../components/gridBox'
import TimeLocationPicker from '../../components/timeLocationPicker'
import StaticView from '../../components/staticView'
import {INIT_ENT_STATIC_PAGE} from './entStaticPage.redux'
import {INIT_CATE_STATIC_PAGE} from './cateStaticPage.redux'
import {INIT_CHJWZ_CONCRETE_STATIC_PAGE} from './chjwzConcreteStatic.redux'
import {doLoadingDataAction} from './statisticPage.redux'
import {ChangeRoute, sendMsgToRN} from '../../utils/router'
import {getEntByName, getThreeCateForBtn, getFilterLocations, testFilterBtns, getRequestTimeLocationCondition, getDefaultTimeCondition,
    logoClassList, getTimeLocationTitleByConditon} from '../../utils/filterConditionConfig'

class StatisticView extends React.Component{
    constructor(props) {
        super(props);
        this.btnItemList = this.getBtnItemList();
        this.filterLocations = getFilterLocations(this.props.commonData);
        this.pickerCondition = {};
        this.onGridClick = this.onGridClick.bind(this);
        this.loadStaticData = this.loadStaticData.bind(this);
    }

    getBtnItemList = () => {
        const commonData = this.props.commonData;
        if (commonData && commonData.subEnts && commonData.statCategories) {
            const ents = getEntByName(commonData.subEnts, [ '隧道工程', '路桥集团', '城建物资']);
            ents.push({name: '上海砼', type: 'ent_cate'});
            const cates = getThreeCateForBtn(commonData.statCategories);
            cates.push({name: '全部', type: 'all'});

            return ents.concat(cates);
        } else {
            //for test
            return testFilterBtns;
        }
    }

    onGridClick = (item, index) =>{
        if(item.type === 'ent') {
            this.props.initEntStatic(item);
            ChangeRoute.goStaticEntPage();
        } else if (item.type === 'cate') {
            this.props.initCateStatic({
                ...item,
                catePaths: [
                    {cateId:item.cateId, name: item.name},
                    {cateId:item.cateId, name: '全部'}
                ]
            });
            ChangeRoute.goStaticCatePage();
        } else if (item.type === 'ent_cate'){
            this.props.initChjwzConcreteStatic({name: '上海城建物资混凝土'});
            ChangeRoute.goStaticChjwzConcretePage();
        } else {
            ChangeRoute.goStaticEntCateFilterPage();
        }
        console.log(item.name);
    };

    renderStaticOverview = () => {
        if (this.props.storeData.loadingSuccess) {
            const title = getTimeLocationTitleByConditon(this.pickerCondition);

            return <StaticView staticData={this.props.storeData} title={title}/>
        }
        return null;
    }

    loadStaticData = (pickerCondition) => {
        this.pickerCondition = {...pickerCondition};
        this.props.loadData({
            ...this.props.commonData.userInfo,
            filterCondition: getRequestTimeLocationCondition(this.pickerCondition)
        });
    };

    componentWillMount() {
        this.loadStaticData({...getDefaultTimeCondition()});
        sendMsgToRN({title: this.props.commonData.entName});
    }

    render () {
        const hideHeader = this.props.commonData.hideHeader;
        return (
            <div>
                <TopNavBar title={this.props.commonData.entName}
                           hideHeader={hideHeader}
                           leftContent={<div className="setting-icon"/>}
                           onLeftBtnClick={ChangeRoute.goSettingPage}
                />

                <div className={"main-section " + (hideHeader ? 'no-top': '')}>
                    <GridBox column="4" data={this.btnItemList} noBackGround={true}
                         renderItem={(item)=>(
                             <div style={{paddingTop: '15px'}}>
                                 {item.name ? <div className={logoClassList[item.name] ? logoClassList[item.name] : logoClassList['other']}/> : <div />}
                                 <p style={{fontSize:'12px', color: '#008ae6'}} >{item.name}</p>
                             </div>
                         )}
                         onItemClick={this.onGridClick}
                    />

                    <WhiteSpace className="gap"/>
                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="240px"
                                        locations={this.filterLocations}
                                        confirmCallback={this.loadStaticData}
                                        pickerCondition={this.pickerCondition}/>

                    <WhiteSpace/>
                    {this.renderStaticOverview()}
                </div>
                <BottomTabBar selectedTab='statistic'/>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        storeData: state.statistic,
        commonData: state.login
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingDataAction(params));
        },
        initEntStatic: (ent) => {
            dispatch({type: INIT_ENT_STATIC_PAGE, ent: ent})
        },
        initCateStatic: (cate) => {
            dispatch({type: INIT_CATE_STATIC_PAGE, cate: cate})
        },
        initChjwzConcreteStatic: (item) => {
            dispatch({type: INIT_CHJWZ_CONCRETE_STATIC_PAGE, item: item})
        }
    }
}

const ConnectedStatisticView = connect(mapStateToProps, mapDispatchToProps)(StatisticView);
export default ConnectedStatisticView;