import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace, Accordion} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import {doLoadingDataAction} from './itemDetailPage.redux'
import {ChangeRoute, sendMsgToRN} from '../../utils/router'


const titleLine = { display: 'flex', margin:'5px 0 10px', fontSize: '15px'};
const imgContainer ={width: '22px', marginRight:'10px'};
const titleColor = {color: '#1aa6eb'};
const valueStyle = {textAlign: 'left'};
class ItemDetailView extends React.Component{
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadData({
            piId: this.props.storeData.itemId,
            ...this.props.commonData.userInfo
        });
        sendMsgToRN({title: '项目详情', backBtnEnabled: true});
    }

    renderItemSupplier = (purchaseItem) => {
        if(purchaseItem && purchaseItem.selectedSupplier){
            return (
                purchaseItem.selectedSupplier.map((supplier, key)=> {
                    return (
                        <div style={{...titleLine, justifyContent:'space-between'}} key={key}>
                            <div style={{display: 'flex'}}>
                                <div style={imgContainer}>
                                    <img className="pi-radio-icon"/>
                                </div>
                                <label >{supplier.supplierEntName}</label>
                            </div>
                            <label>{supplier.supplierJoinTypeStr}</label>
                        </div>
                    )
                })
            )
        }
        return ''
    }
    renderItemProducts = (purchaseItem) => {
        if (purchaseItem && purchaseItem.products) {
            return (
                purchaseItem.products.map((product, key)=> {
                    return (
                        <div style={{...titleLine, justifyContent:'space-between'}} key={key}>
                            <div style={{display: 'flex'}}>
                                <div style={imgContainer}>
                                    <img className="pi-radio-icon"/>
                                </div>
                                <label style={{valueStyle}}>{product.name}</label>
                            </div>
                            <label>{product.cateName + product.special}</label>
                            <label>{product.quantityStr}</label>
                        </div>
                    )
                })
            )
        }
        return '';
    }
    renderItemBasic = (purchaseItem) => {
        return (
            <Accordion.Panel header="采购详情" style={titleColor}>
                <div style={{...titleLine}}>
                    <div style={imgContainer}>
                        <img className="pi-radio-icon"/>
                    </div>
                    <label style={titleColor}>报价类型：</label>
                    <label>{purchaseItem && purchaseItem.quoteType}</label>
                </div>
                <div style={{...titleLine}}>
                    <div style={imgContainer}>
                        <img className="pi-radio-icon"/>
                    </div>
                    <label style={titleColor}>付款周期：</label>
                    <label>{purchaseItem && purchaseItem.paymentCycle}</label>
                </div>
            </Accordion.Panel>
        )
    }
    renderItemHeader = (purchaseItem) => {
        const whiteStyle = {backgroundColor: '#fff'};
        return (
            <div style={whiteStyle}>
                <div style={{display: 'flex', flexDirection: 'column', padding:'10px 10px'}}>
                    <div style={titleLine}>
                        <div style={imgContainer}><img className="pi-purchase-ent-icon"/></div>
                        <label style={{...titleColor, flexShrink: 0}}>项目标题：</label>
                        <div>
                            <label>{purchaseItem && purchaseItem.piTitle}</label>
                        </div>
                    </div>
                    <div style={titleLine} >
                        <div style={imgContainer}><img className="pi-type-icon"/></div>
                        <label style={{...titleColor, flexShrink: 0}}>采购企业：</label>
                        <label>{purchaseItem && purchaseItem.piEnt}</label>
                    </div>
                </div>
            </div>
        )
    }
    render () {
        const purchaseItem = this.props.storeData.purchaseItem;
        const hideHeader = this.props.commonData.userInfo && this.props.commonData.userInfo.hideHeader;
        return (
            <div>
                <TopNavBar title="项目详情"
                           hideHeader={hideHeader}
                           leftContent={<div className="back-icon"/>}
                           onLeftBtnClick={ChangeRoute.goBack}
                />
                <div className={"main-section-no-bottom " + (hideHeader ? 'no-top gap': 'gap')}>
                    {this.renderItemHeader(purchaseItem)}
                    <WhiteSpace/>

                    <Accordion className="item-section">
                        <Accordion.Panel header="采购产品" style={titleColor}>
                            {this.renderItemProducts(purchaseItem)}
                        </Accordion.Panel>
                    </Accordion>
                    <WhiteSpace/>

                    <Accordion className="item-section">
                        {this.renderItemBasic(purchaseItem)}
                    </Accordion>
                    <WhiteSpace/>

                    <Accordion className="item-section">
                        <Accordion.Panel header="供应商" style={titleColor}>
                            {this.renderItemSupplier(purchaseItem)}
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        storeData: state.itemDetailPage,
        commonData: state.login
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingDataAction(params));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailView);
