import React from 'react'
import {connect} from 'react-redux'
import {Button, WhiteSpace, WingBlank, Modal,Flex} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import GridBox from '../../components/gridBox'
import BottomTabBar from '../../components/bottomTabBar'
import EntCard from './entCard'
import {ChangeRoute, sendMsgToRN} from '../../utils/router'
import {doLoadingDataAction} from './entPage.redux'
import {INIT_ENT_COMPARE_PAGE} from './entComparePage.redux'
import {logoClassList} from '../../utils/filterConditionConfig'
import './entPage.css'

class EntView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'normal',                //对比选择时为false
            selectedEnts: []
        };
        this.onGridClick = this.onGridClick.bind(this);
        this.onEntCardClick = this.onEntCardClick.bind(this);
        this.onSetSelectStateBtnClick = this.onSetSelectStateBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.onCompareBtnClick = this.onCompareBtnClick.bind(this);
    }
    onGridClick = (ent) =>{
        this.props.initEntComparePage([ ent.entId]);
        ChangeRoute.goEntComparePage();
    };
    onSetSelectStateBtnClick = () => {
        this.setState({currentState: 'select'})
    };
    onCancelBtnClick = ()=> {
        this.setState({currentState: 'normal', selectedEnts: []})
    };

    onCompareBtnClick =()=> {
        const length = this.state.selectedEnts.length;
        if (length > 4) {
            Modal.alert('', '最多仅能选择4家企业进行对比！', [{text: '确定', style: {height: '40px', lineHeight: '40px'}}]);
        } else {
            this.props.initEntComparePage(this.state.selectedEnts);
            ChangeRoute.goEntComparePage();
        }
    }

    onEntCardClick = (entId, cardChecked) => {
        const isNormalState = this.state.currentState === 'normal';
        if(isNormalState) {

        } else {
            const temp = [];
            if (cardChecked) {
                temp.push(entId);
            } else {
                const index = this.state.selectedEnts.indexOf(entId);
                this.state.selectedEnts.splice(index, 1);
            }
            this.setState({selectedEnts: temp.concat(this.state.selectedEnts)})
        }
        console.log('entId: ' + entId + '; checked: ' + cardChecked);
    };

    renderEntDetail = ()=> {
        const entList = this.props.storeData.entList;
        if (entList && entList.length) {
            return (
                entList.map((ent, key) => {
                  return <EntCard ent={ent} key={key}
                                  onSelectStateClick={this.onEntCardClick}
                                  onNormalStateClick={this.onGridClick}
                                  currentState={this.state.currentState}/>
                })
            )
        }
        return null;
    }

    renderCompareBtn =() => {
        const length = this.state.selectedEnts.length;
        const commonStyle = {flexGrow:1, lineHeight: '40px'};
        const confirmStyle = { backgroundColor: '#ff9c1b', color: '#fff'};

        const disabledBtn = <a style={{...commonStyle, ...confirmStyle, opacity: 0.4}}>对比（{length}）</a>;
        const activeBtn = <a style={{...commonStyle, ...confirmStyle}} onClick={this.onCompareBtnClick}>对比（{length}）</a>;
        const cancelBtn = <a style={{...commonStyle, backgroundColor: '#fff'}} onClick={this.onCancelBtnClick}>取消</a>;

        const btnBoxStyle = {display:'flex', flexDirection: 'row', height: '40px'};
        return (
            <div style={btnBoxStyle} className="bottom-tab-bar">
                {cancelBtn}
                {length > 1 ? activeBtn : disabledBtn}
            </div>
        )
    }
    componentWillMount() {
        this.props.loadData({...this.props.commonData.userInfo});
        sendMsgToRN({title: '企业'});
    }
    render () {
        const isSelectState = this.state.currentState !== 'normal';
        const titleStyle = {display: 'inline', lineHeight: '26px', color: '#868585'};
        const imgStyle = {width:'50px', height: '50px'};
        const entLogo = (shortName) => <div className={logoClassList[shortName] ? logoClassList[shortName] : logoClassList['other']}/>;
        return (
            <div>
                <TopNavBar title="企业" leftContent={<div className="setting-icon"/>} onLeftBtnClick={ChangeRoute.goSettingPage}/>
                <div className="main-section" style={{backgroundColor: '#f5f5f9'}}>
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
                    <WingBlank>
                        <Flex style={{justifyContent: 'space-between'}}>
                            <p className="half-margin-p" style={titleStyle}>企业列表</p>
                            <Button className="compare-select-btn" disabled={isSelectState}
                                    onClick={this.onSetSelectStateBtnClick}>对比</Button>
                        </Flex>
                    </WingBlank>

                    { this.renderEntDetail()}
                </div>

                {isSelectState ? this.renderCompareBtn() : <BottomTabBar selectedTab='ent'/>}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        storeData: state.entPage,
        commonData: state.login
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingDataAction(params));
        },
        initEntComparePage: (params) => {
            dispatch({type: INIT_ENT_COMPARE_PAGE, compareList: params})
        }
    }
}

const ConnectedEntView = connect(mapStateToProps, mapDispatchToProps)(EntView);
export default ConnectedEntView;