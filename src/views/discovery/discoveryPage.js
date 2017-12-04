import React from 'react'
import {connect} from 'react-redux'

class DiscoveryView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>发现 page</div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        storeData: state.discovery
    }
}

const mapDispatchToProps = function (dispatch) {
    return {}
}