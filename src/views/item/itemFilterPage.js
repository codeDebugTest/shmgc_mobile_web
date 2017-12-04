import React from 'react'
import {connect} from 'react-redux'
import { WhiteSpace, WingBlank, ListView} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import TimeLocationPicker from '../../components/timeLocationPicker'
import PurchaseItemCard from '../../components/purchaseItemCard'
import {ChangeRoute, sendMsgToRN} from '../../utils/router'
import {doLoadingDataAction} from './itemPageRedux'
import {INIT_ITEM_DETAIL_PAGE} from './itemDetailPage.redux'
import {getFilterLocations, getRequestTimeLocationCondition, getDefaultTimeCondition} from '../../utils/filterConditionConfig'

const PageConfig = {
    pageSize: 5,
    pageNumber: 1
}
class ItemFilterPage extends React.Component {
    constructor(props) {
        super(props);
        this.piFilterCondition = this.props.storeData.piFilterCondition;
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
                ...this.piFilterCondition,
                ...getRequestTimeLocationCondition(this.pickerCondition),
                ... this.pageConfig,
            }
        }, this.updateListView);
    }

    componentWillMount() {
        this.pickerCondition = {...getDefaultTimeCondition()};
        this.loadData();
        sendMsgToRN({title: this.props.title, backBtnEnabled: true});
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
    render() {
        const hideHeader = this.props.commonData.hideHeader;
        const height =  document.documentElement.clientHeight - 50;
        return (
            <div className={this.piFilterCondition.pageBackGround}>
                <TopNavBar title={this.piFilterCondition.title}
                           style={{backgroundColor: 'inherit'}}
                           hideHeader={hideHeader}
                           leftContent={<div className="back-icon"/>}
                           onLeftBtnClick={ChangeRoute.goBack}/>

                <div className={"main-section-no-bottom " + (hideHeader ? 'no-top': '')} style={{backgroundColor: 'inherit', position: 'inherit'}}>
                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="41px" tabStyle="white-style"
                                        locations={this.filterLocations}
                                        confirmCallback={this.reloadData}
                                        pickerCondition={this.pickerCondition}/>

                    <WhiteSpace/>
                    <WingBlank>
                        <ListView
                            style={{ height: height +'px'}}
                            className="item-list"
                            dataSource={this.state.dataSource}
                            /*                            renderFooter={() => (<div style={{ padding:'10px', textAlign: 'center', backgroundColor: '#ddd' }}>
                             {this.state.isLoading ? '-- 疯狂加载中 --' : '-- 我是有底线的 --'}
                             </div>)}*/
                            onScroll={()=>console.log('scroll')}
                            renderRow={this.renderItem}
                            pageSize={this.pageConfig.pageSize}
                            scrollRenderAheadDistance={100}
                            onEndReached={()=>this.onEndReached()}
                            onEndReachedThreshold={10}
                        />
                    </WingBlank>
                </div>
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
        initItemDetail: (params) => {
            dispatch({type: INIT_ITEM_DETAIL_PAGE, data: params})
        }
    }
}

const ConnectedItemFilterView = connect(mapStateToProps, mapDispatchToProps)(ItemFilterPage);
export default ConnectedItemFilterView;