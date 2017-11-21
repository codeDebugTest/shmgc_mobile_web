import React from 'react'
import SegmentedTabs from './segmentedTabs'
import DropDownView from './dropDownView'
import EntPickerView from './entPickerView'

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
            showCateMenu: false,
            showEntView: false,
        };
        newState[menuName] = true;
        this.setState(newState);
    }


    onEntViewConfirmed = (ent)=> {
        this.picker.ent = ent;
    }

    renderCateMenu =() => {

    };

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

    render() {
        return (
            <div>
                <SegmentedTabs>
                    <div onClick={()=>this.showMenu('showCateMenu')}>材料</div>
                    <div onClick={()=>this.showMenu('showEntView')}>公司</div>
                </SegmentedTabs>

                {this.renderCateMenu()}
                {this.renderEntView()}
            </div>
        )
    }
}