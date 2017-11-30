import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace, Accordion} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import {doLoadingDataAction} from './itemDetailPage.redux'
import {ChangeRoute, sendMsgToRN} from '../../utils/router'

class ItemDetailView extends React.Component{
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        sendMsgToRN({title: '项目详情', backBtnEnabled: true});
    }
    render () {
        const whiteStyle = {backgroundColor: '#fff'};
        const titleLine = { display: 'flex', alignItems: 'center', height: '30px', fontSize: '15px'};
        const imgContainer ={width: '30px', marginRight:'8px'};
        const titleColor = {color: '#1aa6eb'}
        return (
            <div>
                <TopNavBar title="项目详情" leftContent={<div className="setting-icon"/>} onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom gap">
                    <div style={whiteStyle}>
                        <div style={{display: 'flex', flexDirection: 'column', padding:'10px 10px'}}>
                            <div style={titleLine}>
                                <div style={imgContainer}><img className="pi-purchase-ent-icon"/></div>
                                <label style={titleColor}>项目标题：</label>
                                <label>18号线管生产</label>
                            </div>
                            <div style={titleLine} >
                                <div style={imgContainer}><img className="pi-type-icon"/></div>
                                <label style={titleColor}>采购企业：</label>
                                <label>上海隧道工程股份有限公司</label>
                            </div>
                        </div>
                    </div>
                    <WhiteSpace/>

                    <Accordion className="item-section">
                        <Accordion.Panel header="采购产品" style={titleColor}>
                            <div style={{...titleLine, justifyContent:'space-between'}}>
                                <div style={{display: 'flex'}}>
                                    <div style={imgContainer}>
                                        <img className="pi-radio-icon"/>
                                    </div>
                                    <label >01.高线(0101-JG-GC-GX)</label>
                                </div>
                                <label>290吨</label>
                            </div>
                            <div style={{...titleLine, justifyContent:'space-between'}}>
                                <div style={{display: 'flex'}}>
                                    <div style={imgContainer}>
                                        <img className="pi-radio-icon"/>
                                    </div>
                                    <label >01.高线(0101-JG-GC-GX)</label>
                                </div>
                                <label>290吨</label>
                            </div>
                            <div style={{...titleLine, justifyContent:'space-between'}}>
                                <div style={{display: 'flex'}}>
                                    <div style={imgContainer}>
                                        <img className="pi-radio-icon"/>
                                    </div>
                                    <label >01.高线(0101-JG-GC-GX)</label>
                                </div>
                                <label>290吨</label>
                            </div>
                        </Accordion.Panel>
                    </Accordion>

                    <WhiteSpace/>

                    <Accordion className="item-section">
                        <Accordion.Panel header="采购详情" style={titleColor}>

                        </Accordion.Panel>
                    </Accordion>

                    <WhiteSpace/>

                    <Accordion className="item-section">
                        <Accordion.Panel header="供应商" style={titleColor}>

                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        storeData: state.itemDetailPage
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
