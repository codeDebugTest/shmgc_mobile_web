import React from 'react'
import {connect} from 'react-redux'
import TopNavBar from '../../components/topNavBar'
import {ChangeRoute} from '../../utils/router'

class EntCateFilter extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <TopNavBar title="全部" leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom">

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}
const ConnectedEntCateFilterView = connect(mapStateToProps, mapDispatchToProps)(EntCateFilter)
export default ConnectedEntCateFilterView;