import React from 'react'
import {connect} from 'react-redux'
import { WhiteSpace, WingBlank, ListView} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import GridBox from '../../components/gridBox'
import BottomTabBar from '../../components/bottomTabBar'
import TimeLocationPicker from '../../components/timeLocationPicker'
import PurchaseItemCard from '../../components/purchaseItemCard'
import {ChangeRoute, sendMsgToRN} from '../../utils/router'
import {doLoadingDataAction, INIT_ITEM_PAGE} from './itemPageRedux'
import {INIT_ITEM_DETAIL_PAGE} from './itemDetailPage.redux'
import {logoClassList, getFilterLocations, getRequestTimeLocationCondition, getDefaultTimeCondition} from '../../utils/filterConditionConfig'


const PageConfig = {
    pageSize: 5,
    pageNumber: 1
}
class ItemView extends React.Component{
    constructor(props) {
        super(props);
        this.filterLocations = getFilterLocations(this.props.commonData);
        this.pickerCondition = {};
        this.pageConfig = {...PageConfig};
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.piId !== row2.piId,
        });

        this.state = {
            data: [],
            dataSource,
            isLoading: true,
            hasMore: true
        };
        this.updateListView = this.updateListView.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
    }
    onGridClick = (ent) =>{
        this.props.initItemPage({
            entId: ent.entId,
            title: ent.shortName,
            pageBackGround: 'ent-item-background'
        });
        ChangeRoute.goPurchaseItemFilterPage();
    };
    onItemClick = (piId) =>{
        // todo 跳转页面
        this.props.initItemDetail(piId);
        ChangeRoute.goPurchaseItemDetailPage();
    };
    updateListView = (reset) => {
        if (reset) {
            // const newData = [ ...this.props.storeData.purchaseItems];
            this.setState({
                isLoading: false,
                hasMore: this.props.storeData.purchaseItems.length >= this.pageConfig.pageSize,
                data: this.props.storeData.purchaseItems,
                dataSource: this.state.dataSource.cloneWithRows(this.props.storeData.purchaseItems)
            })
        } else {
            const newData = [...this.state.data, ...this.props.storeData.purchaseItems];
            this.setState({
                isLoading: false,
                hasMore: this.props.storeData.purchaseItems.length >= this.pageConfig.pageSize,
                data: newData,
                dataSource: this.state.dataSource.cloneWithRows(newData)
            })
        }

    };

    reloadData = (pickerCondition) => {
        this.pickerCondition = {...pickerCondition};
        this.pageConfig = {...PageConfig};
        this.props.loadData({
            ...this.props.commonData.userInfo,
            filterCondition: {
                ...getRequestTimeLocationCondition(this.pickerCondition),
                ... this.pageConfig,
            }
        }, () => this.updateListView(true));
    };

    loadData = () => {
        this.props.loadData({
            ...this.props.commonData.userInfo,
            filterCondition: {
                ...getRequestTimeLocationCondition(this.pickerCondition),
                ... this.pageConfig,
            }
        }, this.updateListView);
    }

    componentWillMount() {
        this.pickerCondition = {...getDefaultTimeCondition()};
        this.loadData();
        sendMsgToRN({title: '项目'});
    }

    onEndReached = () => {
        /*上推到底*/
        if(this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.pageConfig.pageNumber++;
        this.setState({loading: true});
        this.loadData()
    }
    renderItem = (row, sectionId, rowId) => {
        return (
            <div key={row.piId} >
                <PurchaseItemCard item={row} onClick={this.onItemClick}/>

                <WhiteSpace/>
            </div>
        )
    };
    render () {
        const imgStyle = {width:'50px', height: '50px'};
        const entLogo = (shortName) => <div className={logoClassList[shortName] ? logoClassList[shortName] : logoClassList['default']}/>;
        const hideHeader = this.props.commonData.hideHeader;
        const height =  document.documentElement.clientHeight - 100;
        return (
            <div>
                <TopNavBar title="项目"
                           hideHeader={hideHeader}
                           leftContent={<div className="setting-icon"/>}
                           onLeftBtnClick={ChangeRoute.goSettingPage}/>

                <div className={"main-section " + (hideHeader ? 'no-top item-back-ground': 'item-back-ground')}>
                    <GridBox column="4" style={{background: 'inherit'}} noBackGround={true}
                             data={this.props.commonData.subEnts}
                             renderItem={item=>(
                                 <div style={{paddingTop: '15px'}}>
                                     {item.entId ? entLogo(item.shortName): <div style={imgStyle}/>}
                                     <p style={{fontSize:'12px', color: '#fff'}}>{item.shortName}</p>
                                 </div>
                             )}
                             onItemClick={this.onGridClick}
                    />
                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="316px" tabStyle="white-style"
                                        locations={this.filterLocations}
                                        confirmCallback={this.reloadData}
                                        pickerCondition={this.pickerCondition}/>

                    <WhiteSpace/>
                    <WingBlank>
                        <ListView
                            style={{ height: height + 'px'}}
                            className="item-list"
                            dataSource={this.state.dataSource}
/*                            renderFooter={() => (<div style={{ padding:'10px', textAlign: 'center', backgroundColor: '#ddd' }}>
                                {this.state.isLoading ? '-- 疯狂加载中 --' : '-- 我是有底线的 --'}
                            </div>)}*/
                            onScroll={()=>console.log('scroll')}
                            renderRow={this.renderItem}
                            pageSize={this.pageConfig.pageSize}
                            scrollRenderAheadDistance={90}
                            onEndReached={()=>this.onEndReached()}
                            onEndReachedThreshold={10}
                        />
                    </WingBlank>
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
    return {
        loadData: (params, callback) => {
            dispatch(doLoadingDataAction(params, callback));
        },
        initItemPage: (params) => {
            dispatch({type: INIT_ITEM_PAGE, data: params})
        },
        initItemDetail: (params) => {
            dispatch({type: INIT_ITEM_DETAIL_PAGE, data: params})
        }
    }
}

const ConnectedItemView = connect(mapStateToProps, mapDispatchToProps)(ItemView);
export default ConnectedItemView;