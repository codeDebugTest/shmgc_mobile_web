import React from 'react'
import SegmentedTabs from './segmentedTabs'
import EntPickerView from './entPickerView'
import CatePickerView from "./catePickerView";
import {getCateTitleByCondition} from '../utils/filterConditionConfig'

export default class CateEntPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state ={};
        this.picker = this.props.cateEntCondition;
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
        this.setState({update: !this.state.update});
        this.props.confirmCallback(this.picker);
    }
    onCateViewConfirmed = (cate)=> {
        this.picker.cate = cate;
        this.setState({update: !this.state.update});
        this.props.confirmCallback(this.picker);
    }

    renderEntView = () => {
        if (!this.props.hideEntTab && this.state.showEntView) {
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

    getPickedCate = ()=> {
        return getCateTitleByCondition(this.picker.cate);
    }

    render() {
        const entName = this.picker.ent && this.picker.ent.shortName;
        return (
            <div>
                <SegmentedTabs backgroundStyle={this.props.tabStyle} style={this.props.style}>
                    <div onClick={()=>this.showMenu('showCateView')} className={this.state.showCateView ? 'active': ''}>{this.getPickedCate() || '材料'}</div>
                    {this.props.hideEntTab ? null : <div onClick={()=>this.showMenu('showEntView')} className={this.state.showEntView ? 'active': ''}>{entName || '公司'}</div>}
                </SegmentedTabs>

                {this.renderCateView()}
                {this.renderEntView()}
            </div>
        )
    }
}