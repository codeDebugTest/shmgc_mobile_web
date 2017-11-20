import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import BottomTabBar from '../../components/bottomTabBar'
import GridBox from '../../components/gridBox'
import TimeFilterBar from '../../components/timeFilterBar'
import StaticView from '../../components/staticView'
import {INIT_ENT_STATIC_PAGE} from './entStaticPage.redux'
import {INIT_CATE_STATIC_PAGE} from './cateStaticPage.redux'
import {INIT_CHJWZ_CONCRETE_STATIC_PAGE} from './chjwzConcreteStatic.redux'
import {doLoadingDataAction} from './statisticPage.redux'
import {ChangeRoute} from '../../utils/router'

const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
class StatisticView extends React.Component{
    constructor(props) {
        super(props);
        this.btnItemList =[
            {name: '城建物资', icon: placeholderImg, type: 'ent'},
            {name: '公路桥梁', icon: placeholderImg, type: 'ent'},
            {name: '住总住博', icon: placeholderImg, type: 'ent'},
            {name: '上海砼', icon: placeholderImg, type: 'ent_cate'},

            {name: '混凝土', icon: placeholderImg, type: 'cate'},
            {name: '水泥', icon: placeholderImg, type: 'cate'},
            {name: '钢材', icon: placeholderImg, type: 'cate'},
            {name: '全部', icon: '', type: 'all'},
        ];
        this.onGridClick = this.onGridClick.bind(this);
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

    componentWillMount() {
        this.props.loadData();
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
                    <TimeFilterBar marginTop="222px"/>
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
        storeData: state.statistic
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