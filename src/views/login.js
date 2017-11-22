import React from 'react'
import {connect} from 'react-redux'


class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {}
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchProps =(dispatch) => {
    return {

    }
}

const ConnectedLoginView = connect(mapStateToProps, mapDispatchProps)(Login);
export default ConnectedLoginView