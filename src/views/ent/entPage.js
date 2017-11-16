import React from 'react'
import {connect} from 'react-redux'
import {Button, WhiteSpace, WingBlank, Modal} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import GridBox from '../../components/gridBox'
import BottomTabBar from '../../components/bottomTabBar'
import EntCard from './entCard'
import {routeToSettingPage, routeToEntCompare} from '../../utils/router'
import {doLoadingDataAction} from './entPage.redux'
import './entPage.css'

const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
const btnStyle = {
    display: 'inline',
    float: 'right',
    height: '25px',
    lineHeight: '25px',
    borderRadius: 0,
};
const title = {
    display: 'inline',
    lineHeight: '26px'
};

class EntView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'normal',                //对比选择时为false
            selectedEnts: []
        };
        this.btnItemList =[
            {name: '城建物资', icon: placeholderImg},
            {name: '隧道工程', icon: placeholderImg},
            {name: '公路桥梁', icon: placeholderImg},
            {name: '住总住博', icon: placeholderImg},
            {name: '水务建设', icon: placeholderImg},
            {name: '隧道物资', icon: placeholderImg},
            {name: '城建物资', icon: placeholderImg},
            {name: '其他', icon: ''},
        ];
        this.onGridClick = this.onGridClick.bind(this);
        this.onEntCardClick = this.onEntCardClick.bind(this);
        this.onSetSelectStateBtnClick = this.onSetSelectStateBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.onCompareBtnClick = this.onCompareBtnClick.bind(this);
    }
    onGridClick = (item, index) =>{
        console.log(item.name);
        console.log(item.icon);
    };
    onSetSelectStateBtnClick = () => {
        this.setState({currentState: 'select'})
    };
    onCancelBtnClick = ()=> {
        this.setState({currentState: 'normal'})
    };

    onCompareBtnClick =()=> {
        const length = this.state.selectedEnts.length;
        if (length > 4) {
            Modal.alert('', '最多仅能选择4家企业进行对比！', [{text: '确定', style: {height: '40px', lineHeight: '40px'}}]);
        } else {
            routeToEntCompare();
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
        const entList = this.props.entStore.entList;
        if (entList && entList.length) {
            return (
                entList.map((ent, key) => {
                  return <EntCard ent={ent} key={key} onEntCardClick={this.onEntCardClick} currentState={this.state.currentState}/>
                })
            )
        }
        return null;
    }

    renderCompareBtn =() => {
        const length = this.state.selectedEnts.length;
        const disabledBtn = <a style={{flexGrow:1, backgroundColor: '#108ee9', lineHeight: '40px', color: '#fff', opacity: 0.4}}
                            >对比（{length}）</a>;
        const activeBtn = <a onClick={this.onCompareBtnClick} aria-disabled={length < 1}
                             style={{flexGrow:1, backgroundColor: '#108ee9', lineHeight: '40px', color: '#fff'}}
                            >对比（{length}）</a>;
        const cancelBtn = <a onClick={this.onCancelBtnClick}
                             style={{flexGrow:1, backgroundColor: '#fff', lineHeight: '40px'}}
                            >取消</a>
        return (
            <div style={{display:'flex', flexDirection: 'row', height: '40px'}} className="bottom-tab-bar">
                {cancelBtn}
                {length > 1 ? activeBtn : disabledBtn}
            </div>
        )
    }
    componentWillMount() {
        this.props.loadData();
    }

    render () {
        const isSelectState = this.state.currentState !== 'normal';
        return (
            <div>
                <TopNavBar title="企业" leftContent="设置" onLeftBtnClick={routeToSettingPage}/>
                <div className="main-section">
                    <GridBox column="4" data={this.btnItemList}
                      renderItem={item=>(
                          <div style={{paddingTop: '10px'}}>
                              <img src={item.icon} style={{width:'50px', height: '50px'}}/>
                              <p style={{fontSize:'13px'}} className="grid-p">{item.name}</p>
                          </div>
                      )}
                      onClick={this.onGridClick}
                    />
                    <WhiteSpace/>
                    <WingBlank>
                        <div>
                            <p style={title}>企业列表</p>
                            <Button type="primary" size="small" style={btnStyle} disabled={isSelectState}
                                    onClick={this.onSetSelectStateBtnClick}>对比</Button>
                        </div>
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
        entStore: state.entPage
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => {
            dispatch(doLoadingDataAction(params));
        }
    }
}

const ConnectedEntView = connect(mapStateToProps, mapDispatchToProps)(EntView);
export default ConnectedEntView;