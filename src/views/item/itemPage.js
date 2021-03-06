import React from 'react'
import {connect} from 'react-redux'
import { WhiteSpace, WingBlank, ListView, SearchBar} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import CateEntPicker from '../../components/cateEntPicker'
import BottomTabBar from '../../components/bottomTabBar'
import TimeLocationPicker from '../../components/timeLocationPicker'
import PurchaseItemCard from '../../components/purchaseItemCard'
import ItemConditionPicker from '../../components/itemConditionPicker'
import {ChangeRoute, ROUTE_PATH, sendMsgToRN} from '../../utils/router'
import {doLoadingDataAction, INIT_ITEM_PAGE} from './itemPageRedux'
import {INIT_ITEM_DETAIL_PAGE} from './itemDetailPage.redux'
import {logoClassList, getFilterLocations, getRequestTimeLocationCondition,
    getDefaultTimeCondition, getDefaultItemCondition, getRequestItemCondition} from '../../utils/filterConditionConfig'


const PageConfig = {
    pageSize: 8,
    pageNumber: 1
}
class ItemView extends React.Component{
    constructor(props) {
        super(props);
        this.filterLocations = getFilterLocations(this.props.commonData);
        this.pickedTimeLocation = {};
        this.pickedItemLocation = {};
        this.cateEntCondition ={};
        this.pageConfig = {...PageConfig};
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.piId !== row2.piId,
        });

        this.state = {
            data: [],
            dataSource,
            isLoading: true,
            hasMore: true,
            searchKey: ''
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

    timeConditionChanged = (pickerCondition) => {
        this.pickedTimeLocation = {...pickerCondition};
        this.pageConfig = {...PageConfig};
        this.loadData(true, this.state.searchKey)
    };
    itemConditionChanged = (pickerCondition) => {
        this.pickedItemLocation = {...pickerCondition};
        this.pageConfig = {...PageConfig};
        this.loadData(true, this.state.searchKey)
    };

    onSearchSubmit = () => {
        this.pageConfig = {...PageConfig};
        this.loadData(true, this.state.searchKey)
    }
    onClearSearchKey = () => {
        this.setState({searchKey: ''});
        this.pageConfig = {...PageConfig};
        this.loadData(true);
    }

    loadData = (reset, searchKey) => {
        this.props.loadData({
            ...this.props.commonData.userInfo,
            filterCondition: {
                searchKey: searchKey,
                ...getRequestItemCondition(this.pickedItemLocation),
                ...getRequestTimeLocationCondition(this.pickedTimeLocation),
                ... this.pageConfig,
            }
        }, () => this.updateListView(reset));
    }

    componentWillMount() {
        this.pickedTimeLocation = {...getDefaultTimeCondition()};
        this.pickedItemLocation = {...getDefaultItemCondition()}
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
        const hideHeader = this.props.commonData.hideHeader;
        const height =  document.documentElement.clientHeight - 100;
        return (
            <div>
                <TopNavBar title="项目"
                           hideHeader={hideHeader}
                           leftContent={<div className="setting-icon"/>}
                           onLeftBtnClick={ChangeRoute.goSettingPage}/>

                <div className={"main-section " + (hideHeader ? 'no-top item-back-ground': 'item-back-ground')}>
                    <WhiteSpace/>

                    <WingBlank>
                        <SearchBar style={{padding: 0, background: 'inherit'}}
                                   className="white-label"
                                   placeholder="Search"
                                   cancelText="搜索"
                                   maxLength={16}
                                   value={this.state.searchKey}
                                   onChange={value => this.setState({searchKey: value})}
                                   onSubmit={value => this.onSearchSubmit(value)}
                                   onCancel={value => this.onSearchSubmit(value)}
                                   onClear={value => this.onClearSearchKey()}
                        />
                    </WingBlank>

                    <WhiteSpace/>
                    <CateEntPicker marginTop="95px" tabStyle="white-style"
                                   style={{borderBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
                                   hideEntTab={true}
                                   categories={this.props.commonData.filterCategories}
                                   cateEntCondition ={this.cateEntCondition}
                                   confirmCallback={this.onCateEntPickedCallback}/>

                    <ItemConditionPicker marginTop="126px" tabStyle="white-style"
                                         style={{borderBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
                                         ents={this.props.commonData.subEnts}
                                         pickedCondition={this.pickedItemLocation}
                                         confirmCallback={this.itemConditionChanged}/>

                    <TimeLocationPicker marginTop="156px" tabStyle="white-style"
                                        locations={this.filterLocations}
                                        confirmCallback={this.timeConditionChanged}
                                        pickerCondition={this.pickedTimeLocation}/>

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

                <BottomTabBar selectedTab={ROUTE_PATH.PURCHASE_ITEM}/>
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