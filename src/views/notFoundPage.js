/**
 * Created by code on 2017/10/25.
 */
import React from 'react'
import {connect} from 'react-redux'

class NotFound extends React.Component{
    render () {
        return (
            <div><h1>404 not found</h1></div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {}
};
const mapDispatchToProps = (dispatch) => {
    return {}
}

const ConnectedNotFoundView = connect(mapStateToProps, mapDispatchToProps)(NotFound);
export default ConnectedNotFoundView