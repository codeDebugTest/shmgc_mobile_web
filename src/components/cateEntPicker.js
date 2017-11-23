import React from 'react'
import SegmentedTabs from './segmentedTabs'
import EntPickerView from './entPickerView'
import CatePickerView from "./catePickerView";

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
        if (this.picker.cate) {
            return this.picker.cate[0].split('-')[1] + '-' + this.picker.cate[1].split('-')[1];
        }
        return null
    }

    render() {
        const entName = this.picker.ent && this.picker.ent.shortName;
        return (
            <div>
                <SegmentedTabs style={{borderBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
                    <div onClick={()=>this.showMenu('showCateView')}>{this.getPickedCate() || '材料'}</div>
                    {this.props.hideEntTab ? null : <div onClick={()=>this.showMenu('showEntView')}>{entName || '公司'}</div>}
                </SegmentedTabs>

                {this.renderCateView()}
                {this.renderEntView()}
            </div>
        )
    }
}