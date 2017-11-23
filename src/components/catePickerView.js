import React from 'react'
import DropDownView from "./dropDownView";
import {Menu} from 'antd-mobile'

export default class  CatePickerView extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            showView: true,
        }
        this.selectedCate = this.props.value;
        this.onSelectChanged = this.onSelectChanged.bind(this);
    }

    onSelectChanged = (cate) => {
        this.selectedCate = cate;
    }
    onViewCanceled = () => {
        this.setState({showView: false});
        this.props.onViewCanceled();
    };

    onViewConfirmed = () => {
        console.log(this.selectedCate)
        this.onViewCanceled();
        this.props.onViewConfirmed(this.selectedCate);
    };


    render () {
        return (
            <DropDownView top={this.props.marginTop} onCancel={this.onViewCanceled} onOk={this.onViewConfirmed}>
                <Menu data={this.props.data} onChange={this.onSelectChanged} value={this.selectedCate}/>
            </DropDownView>
        )
    }
}
