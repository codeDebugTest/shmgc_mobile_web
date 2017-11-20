import React from 'react'
import {connect} from 'react-redux'
import TopNavBar from "../../components/topNavBar"
import ItemCard from '../../components/itemCard'
import {WhiteSpace} from 'antd-mobile'
import {doLoadingDataAction} from './homeItem.redux'
import {ChangeRoute} from '../../utils/router'

class HomeItemPage extends React.Component {
    constructor(props) {
        super(props);
    }

    renderItems = () => {
        const purchaseItems = this.props.storeData.purchaseItems;
        if (purchaseItems) {
            return (
                purchaseItems.map((purchaseItem) => {
                    return  <ItemCard key={purchaseItem.piId} item={purchaseItem}/>
                })
            )
        }
        return null;
    };
    componentWillMount() {
        this.props.loadData();
    }
    render() {
        return (
            <div style={{backgroundColor: 'blue'}}>
                <TopNavBar title={this.props.storeData.itemTypeName} leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>

                    {this.renderItems()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        storeData: state.homeItem
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingDataAction(params))
        }
    }
};
const ConnectedHomeItemView = connect(mapStateToProps, mapDispatchToProps)(HomeItemPage);
export default ConnectedHomeItemView


