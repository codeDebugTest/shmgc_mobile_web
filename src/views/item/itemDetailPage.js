/**
 * Created by code on 2017/10/25.
 */
import React from 'react'
import {connect} from 'react-redux'

class ItemDetailView extends React.Component{
    render () {
        return (
            <div><h1>采购项目 page</h1></div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {}
};
const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailView);
