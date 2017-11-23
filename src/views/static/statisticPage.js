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
import {getThreeEntForBtn, getThreeCateForBtn, getFilterLoactions, testFilterBtns} from '../../utils/fiterConditionConfig'

const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
class StatisticView extends React.Component{
    constructor(props) {
        super(props);
        this.btnItemList = this.getBtnItemList();
        this.filterLocations = getFilterLoactions(this.props.commonData);
        this.onGridClick = this.onGridClick.bind(this);
        this.loadStaticData = this.loadStaticData.bind(this);
        this.pickerCondition = {
            cutoffTime: '10',
            otherTime: null,
            quarter: null,
            location: null,
            timeByAttr: 'cutoffTime'
        };
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

    getFilterCondition = () => {
        const condition = {location: this.pickerCondition.location && this.pickerCondition.location.id};
        if (this.pickerCondition.timeByAttr === 'quarter') {
            const quarter = this.pickerCondition.quarter;
            if (quarter) {
                condition.pbBeginDate = '2017-' + ((quarter -1) * 3 + 1);
                condition.pbEndDate = '2017-' + ((quarter -1) * 3 + 3);
                return condition;
            }
        } else if(this.pickerCondition.timeByAttr === 'otherTime') {
            const otherTime = this.pickerCondition.otherTime;
            if (otherTime) {
                condition.pbBeginDate = otherTime.startTime;
                condition.pbEndDate = otherTime.endTime;
                return condition;
            }
        } else if (this.pickerCondition.timeByAttr === 'cutoffTime') {
            const cutoffTime = this.pickerCondition.cutoffTime;
            if (cutoffTime) {
                condition.pbBeginDate = '2017-1';
                condition.pbEndDate = '2017-' + cutoffTime;
                return condition;
            }
        }


        condition.pbBeginDate = null;
        condition.pbEndDate = null;
        return condition;
    }
    loadStaticData = (pickerCondition) => {
        this.pickerCondition = {...pickerCondition};
        this.props.loadData({
            loginName: 'zhougang',
            password: '123456',
            filterCondition: this.getFilterCondition()
        });
    };

    componentWillMount() {
        this.props.loadData({loginName: 'zhougang', password: '123456'});
    }

    render () {
        return (
            <div>
                <TopNavBar title="统计" leftContent="设置" onLeftBtnClick={ChangeRoute.goSettingPage}/>

                <div className="main-section">
                    <GridBox column="4" data={this.btnItemList}
                         renderItem={item=>(
                             <div style={{paddingTop: '10px'}}>
                                 <img src={item.icon} style={{width:'50px', height: '50px'}}/>
                                 <p style={{fontSize:'13px'}} className="half-margin-p">{item.name}</p>
                             </div>
                         )}
                         onItemClick={this.onGridClick}
                    />

                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="222px" locations={this.filterLocations} confirmCallback={this.loadStaticData} pickerCondition={this.pickerCondition}/>
                    <WhiteSpace/>

                    <p className="half-margin-p">截止十月数据统计总览</p>

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