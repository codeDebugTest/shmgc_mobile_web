import React from 'react'
import SegmentedTabs from './segmentedTabs'
import EntPickerView from './entPickerView'
import CatePickerView from "./catePickerView";

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
        this.props.confirmCallback(this.picker);
    }
    onCateViewConfirmed = (cate)=> {
        this.picker.cate = cate;
        this.props.confirmCallback(this.picker);
    }

    renderEntView = () => {
        if (this.state.showEntView) {
            return <EntPickerView onViewCanceled={()=> this.setState({showEntView: false})}
                                  onViewConfirmed={this.onEntViewConfirmed}
                                  value ={this.picker.ent}
                                  data={this.props.ents}
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