import React from 'react'
import SegmentedTabs from './segmentedTabs'
import EntPickerView from './entPickerView'
import CatePickerView from "./catePickerView";

const entList = [
    {
        entId: '11',
        entName: '城建物资',
    },{
        entId: '12',
        entName: '公路桥梁',
    },{
        entId: '13',
        entName: '住总住博',
    },{
        entId: '14',
        entName: '隧道工程',
    },{
        entId: '15',
        entName: '水务建设',
    },{
        entId: '16',
        entName: '自来水管线',
    }
]
export default class CateEntPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state ={};
        this.picker = {
            ent: null,
            cate: null
        }
        this.showMenu = this.showMenu.bind(this)
    }
    showMenu = (menuName) => {
        const newState = {
            showCateView: false,
            showEntView: false,
        };
        newState[menuName] = true;
        this.setState(newState);
    }


    onEntViewConfirmed = (ent)=> {
        this.picker.ent = ent;
    }
    onCateViewConfirmed = (cate)=> {
        this.picker.cate = cate;
    }

    renderEntView = () => {
        if (this.state.showEntView) {
            return <EntPickerView onViewCanceled={()=> this.setState({showEntView: false})}
                                  onViewConfirmed={this.onEntViewConfirmed}
                                  value ={this.picker.ent}
                                  data={entList}
                                  marginTop={this.props.marginTop}/>
        }
        return null;
    };
    renderCateView = () => {
        if (this.state.showCateView) {
            return <CatePickerView marginTop={this.props.marginTop}
                                   data = {this.props.categories}
                                   value ={this.picker.cate}
                                   onViewCanceled={()=> this.setState({showCateView: false})}
                                   onViewConfirmed={this.onCateViewConfirmed}
            />
        }
        return null
    }

    render() {
        return (
            <div>
                <SegmentedTabs style={{borderBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
                    <div onClick={()=>this.showMenu('showCateView')}>材料</div>
                    <div onClick={()=>this.showMenu('showEntView')}>公司</div>
                </SegmentedTabs>

                {this.renderCateView()}
                {this.renderEntView()}
            </div>
        )
    }
}