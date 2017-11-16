import React from 'react'
import {connect} from 'react-redux'
import {Button, WhiteSpace, WingBlank} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import GridBox from '../../components/gridBox'
import EntCard from './entCard'
import {routeToSettingPage} from '../../utils/router'
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
            currentState: 'normal'                //对比选择时为false
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
        this.onCompareBtnClick = this.onCompareBtnClick.bind(this);
    }
    onGridClick = (item, index) =>{
        console.log(item.name);
        console.log(item.icon);
    };
    onCompareBtnClick = () => {
        const currentState = this.state.currentState === 'normal' ? 'select' : 'normal';
        this.setState({currentState: currentState})
    }
    onEntCardClick = (entId, cardChecked) => {
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

    componentWillMount() {
        this.props.loadData();
    }

    render () {
        const disabledBtn = this.state.currentState !== 'normal';
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
                            <Button type="primary" size="small" style={btnStyle} disabled={disabledBtn}
                                    onClick={this.onCompareBtnClick}>对比</Button>
                        </div>
                    </WingBlank>
                    { this.renderEntDetail()}
                </div>
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