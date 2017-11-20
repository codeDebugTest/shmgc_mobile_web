import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace, WingBlank} from 'antd-mobile'
import TimeFilterBar from '../../components/timeFilterBar'
import CateEntFilterBar from '../../components/cateEntFilterBar'
import TopNaveBar from "../../components/topNavBar";
import {doLoadingDataAction} from './entStaticPage.redux'
import {ChangeRoute} from '../../utils/router'


class EntStaticPage extends React.Component {
    constructor(props) {
        super(props);
        this.ent = this.props.storeData.ent;
    }

    render() {
        return (
            <div>
                <TopNaveBar title={this.ent && this.ent.name} leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
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
        storeData: state.entStatic
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingDataAction(params))
        }
    }
};
const ConnectedEntStaticView = connect(mapStateToProps, mapDispatchToProps)(EntStaticPage);
export default ConnectedEntStaticView