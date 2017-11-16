import React from 'react'
import {connect} from 'react-redux'
import {Button, WhiteSpace} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import GridBox from '../../components/gridBox'
import {routeToSettingPage} from '../../utils/router'

const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
class EntView extends React.Component{
    constructor(props) {
        super(props);
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
    }
    onGridClick = (item, index) =>{
        console.log(item.name);
        console.log(item.icon);
    }

    render () {
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

                </div>
            </div>
        )
    }
}0

const mapStateToProps = (state) =>{
    return {}
};
const mapDispatchToProps = (dispatch) => {
    return {}
}

const ConnectedEntView = connect(mapStateToProps, mapDispatchToProps)(EntView);
export default ConnectedEntView;