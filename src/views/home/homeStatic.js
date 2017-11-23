import React from 'react'
import {connect} from 'react-redux'
import {WhiteSpace} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import TimeLocationPicker from '../../components/timeLocationPicker'
import StaticView from '../../components/staticView'
import {doLoadingDataAction} from './homeStatic.redux'
import {ChangeRoute} from '../../utils/router'

class HomeStatic extends React.Component {
    constructor(props) {
        super(props);
    }

    renderStaticOverview = () => {
        if (this.props.storeData.loadingSuccess) {
            return <StaticView staticData={this.props.storeData}/>
        }
        return null;
    }
    componentWillMount() {
        this.props.loadPageData({
            loginName: 'admin',
            password: '123',
        });
    }
    render() {
        return (
            <div>
                <TopNavBar title="企业数据总览" leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom">
                    <WhiteSpace/>
                    <TimeLocationPicker marginTop="41px"/>
                    <p>截止上月数据统计概览</p>

                    {this.renderStaticOverview()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        storeData: state.homeStatic
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadPageData: (params) => {
            dispatch(doLoadingDataAction(params));
        }
    }
};

const ConnectedHomeStaticView = connect(mapStateToProps, mapDispatchToProps)(HomeStatic);
export default ConnectedHomeStaticView;