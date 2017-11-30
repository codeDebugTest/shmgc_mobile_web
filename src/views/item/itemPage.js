import React from 'react'
import {connect} from 'react-redux'
import {Button, WhiteSpace, WingBlank, ListView} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import GridBox from '../../components/gridBox'
import BottomTabBar from '../../components/bottomTabBar'
import TimeLocationPicker from '../../components/timeLocationPicker'
import PurchaseItemCard from '../../components/purchaseItemCard'
import {ChangeRoute} from '../../utils/router'
import {doLoadingDataAction} from './itemPageRedux'
import {logoClassList, getFilterLoactions, getRequestTimeLocationCondition} from '../../utils/filterConditionConfig'

class ItemView extends React.Component{
    constructor(props) {
        super(props);
        this.filterLocations = getFilterLoactions(this.props.commonData);
        this.pickerCondition = {};
        this.pageConfig = {
            pageSize: 5,
            pageNumber: 1
        }
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.piId !== row2.piId,
        });

        this.state = {
            dataSource,
            isLoading: true,
            hasMore: true
        };
        this.updateListView = this.updateListView.bind(this);
    }
    onGridClick = (ent) =>{
        // todo 跳转页面
    };

    updateListView = () => {
        if (this.props.storeData.purchaseItems.length < this.pageConfig.pageSize) {
            this.setState({hasMore: false});
        } else {
            this.setState({
                loading: false,
                dataSource: this.state.dataSource.cloneWithRows(this.props.storeData.purchaseItems)
            })
        }
    };

    loadStaticData = (pickerCondition) => {
        this.pickerCondition = {...pickerCondition};
        this.props.loadData({
            ... this.pageConfig,
            ...this.props.commonData.userInfo,
            filterCondition: getRequestTimeLocationCondition(this.pickerCondition)
        }, this.updateListView);
    };

    componentWillMount() {
        this.loadStaticData({});
    }

    onEndReached = () => {
        /*上推到底*/
        if(this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.pageConfig.pageNumber++;
        this.setState({loading: true});
        this.loadStaticData({})
    }
    renderItem = (row, sectionId, rowId) => {
        return (
            <div key={row.piId} >
                <PurchaseItemCard item={row}/>

                <WhiteSpace/>
            </div>
        )
    };
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
                    <WingBlank>
                        <ListView
                            style={{overflow: 'inherit'}}
                            className="item-list"
                            dataSource={this.state.dataSource}
                            renderRow={this.renderItem}
                            pageSize={this.pageConfig.pageSize}
                            scrollRenderAheadDistance={100}
                            onEndReached={this.onEndReached}
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
        }
    }
}

const ConnectedItemView = connect(mapStateToProps, mapDispatchToProps)(ItemView);
export default ConnectedItemView;