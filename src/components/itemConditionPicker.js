import React from 'react'
import SegmentedTabs from './segmentedTabs'
import TagPickerView from './tagPickerView'
import EntPickerView from "./entPickerView";

const typeList =[
    {id: 0, value: '全部'},
    {id: 2, value: '比价'},
    {id: 4, value: '招标'},
    {id: 5, value: '协议'},
];
const statusList =[
    {id: 0, value: '全部'},
    {id: 1, value: '进行中'},
    {id: 2, value: '已结束'},
];
export default class ItemConditionPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state ={};
        this.picker = this.props.pickedCondition ||{};
        this.showMenu = this.showMenu.bind(this)
    }
    showMenu = (menuName) => {
        const newState = {
            showStatusView: false,
            showTypeView: false,
            showEntView: false,
        };
        newState[menuName] = true;
        this.setState(newState);
    }

    onEntViewConfirmed = (ent) => {
        this.picker.ent = ent;
        this.props.confirmCallback(this.picker);
    }
    onStatusViewConfirmed = (value) => {
        this.picker.itemStatus = value;
        this.props.confirmCallback(this.picker);
    }
    onTypeViewConfirmed = (value) => {
        this.picker.itemType = value;
        this.props.confirmCallback(this.picker);
    }

    renderEntView = ()=> {
        if (this.state.showEntView) {
            return <EntPickerView marginTop={this.props.marginTop}
                                       data={this.props.ents}
                                       value={this.picker.ent}
                                       onViewCanceled={()=>this.setState({showEntView: false})}
                                       onViewConfirmed={this.onEntViewConfirmed}/>
        }
        return null;
    };
    renderTypeView = () => {
        if (this.state.showTypeView) {
            return <TagPickerView marginTop={this.props.marginTop}
                                        data = {typeList}
                                        value={this.picker.itemType}
                                        onViewCanceled={()=>this.setState({showTypeView: false})}
                                        onViewConfirmed={this.onTypeViewConfirmed}
            />
        }
        return null
    };
    renderStatusView = () => {
        if (this.state.showStatusView) {
            return <TagPickerView marginTop={this.props.marginTop}
                                   data = {statusList}
                                   value ={this.picker.itemStatus}
                                   onViewCanceled={()=> this.setState({showStatusView: false})}
                                   onViewConfirmed={this.onStatusViewConfirmed}
            />
        }
        return null
    }

    render() {
        const pickedStatus = this.picker.itemStatus && this.picker.itemStatus.value;
        const pickedType = this.picker.itemType && this.picker.itemType.value;
        const entName = this.picker.ent && this.picker.ent.shortName;
        return (
            <div>
                <SegmentedTabs backgroundStyle={this.props.tabStyle} style={this.props.style}>
                    <div onClick={()=>this.showMenu('showStatusView')}
                         className={this.state.showStatusView ? 'active': ''}>
                        {pickedStatus || '全部'}
                    </div>
                    <div onClick={()=>this.showMenu('showTypeView')}
                         className={this.state.showTypeView ? 'active': ''}>
                        {pickedType || '全部'}
                    </div>
                    <div onClick={()=>this.showMenu('showEntView')}
                         className={this.state.showEntView ? 'active': ''}>
                        {entName || '公司'}
                    </div>
                </SegmentedTabs>

                {this.renderEntView()}
                {this.renderTypeView()}
                {this.renderStatusView()}
            </div>
        )
    }
}
