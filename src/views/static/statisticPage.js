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
import {ChangeRoute} from '../../utils/router'
import {getThreeEntForBtn, getThreeCateForBtn, getFilterLoactions, testFilterBtns, getRequestTimeLocationCondition, logoClassList} from '../../utils/filterConditionConfig'

const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
class StatisticView extends React.Component{
    constructor(props) {
        super(props);
        this.btnItemList = this.getBtnItemList();
        this.filterLocations = getFilterLoactions(this.props.commonData);
        this.pickerCondition = {};
        this.onGridClick = this.onGridClick.bind(this);
        this.loadStaticData = this.loadStaticData.bind(this);
    }

    getBtnItemList = () => {
        const commonData = this.props.commonData;
        if (commonData && commonData.subEnts && commonData.statCategories) {
            const ents = getThreeEntForBtn(commonData.subEnts);
            ents.push({name: '上海砼', icon: placeholderImg, type: 'ent_cate'});
            const cates = getThreeCateForBtn(commonData.statCategories);
            cates.push({name: '全部', icon: placeholderImg, type: 'all'});

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
            this.props.initCateStatic(item);
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
            return <StaticView staticData={this.props.storeData}/>
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
        this.loadStaticData({});
    }

    render () {
        return (
            <div>
                <TopNavBar title="统计" leftContent={<div className="setting-icon"/>} onLeftBtnClick={ChangeRoute.goSettingPage}/>

                <div className="main-section">
                    <GridBox column="4" data={this.btnItemList}
                         renderItem={(item)=>(
                             <div style={{paddingTop: '10px'}}>
                                 <div className={logoClassList[item.name] ? logoClassList[item.name] : logoClassList['other']}/>
                                 <p style={{fontSize:'13px'}} className="half-margin-p">{item.name}</p>
                             </div>
                         )}
                         onItemClick={this.onGridClick}
                    />

                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="198px"
                                        locations={this.filterLocations}
                                        confirmCallback={this.loadStaticData}
                                        pickerCondition={this.pickerCondition}/>
                    <WhiteSpace/>

                    <p className="half-margin-p">数据统计总览</p>

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