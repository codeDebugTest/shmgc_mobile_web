import React from 'react'
import {WhiteSpace, WingBlank, ListView} from 'antd-mobile'
import PurchaseItemCard from '../../components/purchaseItemCard'

export default class ItemContainer extends React.Component {
    constructor(props) {
        super(props);
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
        return (
            <WingBlank>
                <ListView
                    style={this.props.style}
                    className="item-list"
                    dataSource={this.state.dataSource}
                    /*                            renderFooter={() => (<div style={{ padding:'10px', textAlign: 'center', backgroundColor: '#ddd' }}>
                     {this.state.isLoading ? '-- 疯狂加载中 --' : '-- 我是有底线的 --'}
                     </div>)}*/
                    renderRow={this.renderItem}
                    pageSize={this.pageConfig.pageSize}
                    scrollRenderAheadDistance={90}
                    onEndReached={()=>this.onEndReached()}
                    onEndReachedThreshold={10}
                />
            </WingBlank>
        )

    }
 }
