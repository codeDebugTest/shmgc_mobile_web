import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace, WingBlank} from 'antd-mobile'
import TimeFilterBar from '../../components/timeFilterBar'
import CateEntFilterBar from '../../components/cateEntFilterBar'
import TopNaveBar from "../../components/topNavBar";
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
                <TopNaveBar title={this.cate && this.cate.name} leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>
                    <CateEntFilterBar marginTop="41px"/>
                    <WhiteSpace/>
                    <TimeFilterBar marginTop="82px"/>

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
