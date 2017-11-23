import React from 'react'
import {connect} from 'react-redux'
import {Card, WhiteSpace} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import GridBox from '../../components/gridBox'
import CatePickerPanel from '../../components/catePickerPanel'
import {ChangeRoute} from '../../utils/router'
import {INIT_ENT_STATIC_PAGE} from './entStaticPage.redux'
import {INIT_CATE_STATIC_PAGE} from './cateStaticPage.redux'
import {INIT_CHJWZ_CONCRETE_STATIC_PAGE} from './chjwzConcreteStatic.redux'
import './entCateFilter.css'

const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';

class EntCateFilter extends React.Component {
    constructor(props) {
        super(props);
        this.onEntItemClick = this.onEntItemClick.bind(this);
        this.onCateItemClick = this.onCateItemClick.bind(this);
    }

    onEntItemClick = (ent) => {
        this.props.initEntStatic({name: ent.shortName, entId: ent.entId});
        ChangeRoute.goStaticEntPage();
    };
    onCateItemClick = (cate) => {
        this.props.initCateStatic({name: cate.label, cateId: cate.value.split('-')[0]});
        ChangeRoute.goStaticCatePage();
    };

    render() {
        const cardStyle ={padding: '5px 10px', borderTop: '1px solid #ddd', color: '#008ae6'};
        const itemIconStyle = {width:'50px', height: '50px'};
        const btnStyle = {margin: '5px 8px', border: '0', backgroundColor: '#fff',  color: '#008ae6'};
        return (
            <div>
                <TopNavBar title="全部" leftContent="返回" onLeftBtnClick={ChangeRoute.goBack}/>
                <div className="main-section-no-bottom" style={{color: 'blue'}}>
                    <Card>
                        <Card.Header title="企业" className="ent-cate-card"/>
                        <Card.Body style={cardStyle}>
                            <GridBox column="4" data={this.props.commonData.subEnts}
                                     renderItem={ent=>(
                                         <div style={{paddingTop: '10px', width: '100%'}}>
                                             {ent.entId ? <img src={placeholderImg} style={itemIconStyle}/>: <div style={itemIconStyle}/>}

                                             <p style={{fontSize:'13px'}} className="half-margin-p">{ent.shortName}</p>
                                         </div>
                                     )}
                                     onItemClick={this.onEntItemClick}
                            />
                        </Card.Body>
                    </Card>

                    <WhiteSpace/>

                    <Card>
                        <Card.Header title="材料" className="ent-cate-card"/>
                        <Card.Body style={cardStyle}>
                            {
                                this.props.commonData.filterCategories.map((category) => {
                                    return <CatePickerPanel key={category.value} onClick={this.onCateItemClick} cate={category}/>
                                })
                            }
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        commonData: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initEntStatic: (ent) => {
            dispatch({type: INIT_ENT_STATIC_PAGE, ent: ent})
        },
        initCateStatic: (cate) => {
            dispatch({type: INIT_CATE_STATIC_PAGE, cate: cate})
        },
        initChjwzConcreteStatic: (item) => {
            dispatch({type: INIT_CHJWZ_CONCRETE_STATIC_PAGE, item: item})
        }
    }
}
const ConnectedEntCateFilterView = connect(mapStateToProps, mapDispatchToProps)(EntCateFilter)
export default ConnectedEntCateFilterView;