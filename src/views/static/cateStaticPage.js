import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TimeLocationPicker from '../../components/timeLocationPicker'
import CateEntPicker from '../../components/cateEntPicker'
import TopNavBar from "../../components/topNavBar";
import {doLoadingDataAction} from './entStaticPage.redux'
import {ChangeRoute} from '../../utils/router'


class CateStaticPage extends React.Component {
    constructor(props) {
        super(props);
        this.cate = this.props.storeData.cate;
    }

    render() {
        return (
            <div>
                <TopNavBar title={this.cate && this.cate.name} leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>
                    <CateEntPicker marginTop="41px"/>
                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="82px"/>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        storeData: state.cateStatic
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingDataAction(params))
        }
    }
};
const ConnectedCateStaticView = connect(mapStateToProps, mapDispatchToProps)(CateStaticPage);
export default ConnectedCateStaticView
