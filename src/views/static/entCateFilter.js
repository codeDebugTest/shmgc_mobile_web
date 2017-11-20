import React from 'react'
import {connect} from 'react-redux'
import {Card, WhiteSpace} from 'antd-mobile'
import TopNavBar from '../../components/topNavBar'
import GridBox from '../../components/gridBox'
import CateSelectPanel from '../../components/cateSelectPanel'
import {ChangeRoute} from '../../utils/router'
import './entCateFilter.css'

const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
const categories =[
    {
        name: '混凝土',
        statCateId: '12',
        children: [
            {
                name: 'C15',
                statCateId: '121',
            },{
                name: 'C30',
                statCateId: '122',
            },{
                name: 'C45',
                statCateId: '123',
            },{
                name: 'C60',
                statCateId: '124',
            },{
                name: 'C75',
                statCateId: '125',
            },{
                name: 'C20',
                statCateId: '126',
            },{
                name: 'C35',
                statCateId: '127',
            },{
                name: 'C50',
                statCateId: '128',
            },{
                name: 'C65',
                statCateId: '129',
            },{
                name: 'C80',
                statCateId: '130',
            },{
                name: 'C25',
                statCateId: '131',
            },{
                name: 'C40',
                statCateId: '132',
            },{
                name: 'C55',
                statCateId: '133',
            },{
                name: 'C70',
                statCateId: '134',
            },{
                name: '钢纤维',
                statCateId: '135',
            },{
                name: '陶粒式',
                statCateId: '136',
            },{
                name: '沥青混',
                statCateId: '137',
            },{
                name: '其他',
                statCateId: '138',
            }
        ]
    },{
        name: '水泥',
        statCateId: '14',
        children: [
            {
                name: '桥梁支座',
                statCateId: '140',
            },{
                name: '预制柱',
                statCateId: '141',
            },{
                name: '预制梁',
                statCateId: '142',
            },{
                name: '桥箱梁',
                statCateId: '143',
            },{
                name: '桥梁构建',
                statCateId: '144',
            },{
                name: '预制内墙板',
                statCateId: '145',
            },{
                name: '预制飘窗板',
                statCateId: '146',
            },{
                name: '预制楼梯',
                statCateId: '147',
            },{
                name: '预制外墙板',
                statCateId: '148',
            },{
                name: '预制构件',
                statCateId: '149',
            }
        ]
    }, {
        name: '钢筋',
        statCateId: '15',
        children: [
            {
                name: '螺纹钢',
                statCateId: '150',
            },{
                name: '角铁',
                statCateId: '151',
            },{
                name: '方管',
                statCateId: '152',
            },{
                name: 'H型钢',
                statCateId: '153',
            },{
                name: '角钢',
                statCateId: '154',
            },{
                name: '钢板',
                statCateId: '155',
            },{
                name: '槽钢',
                statCateId: '156',
            },{
                name: '盘螺',
                statCateId: '157',
            },{
                name: '圆钢',
                statCateId: '158',
            },{
                name: '高线',
                statCateId: '159',
            },{
                name: '钢管',
                statCateId: '160',
            },{
                name: '工字钢',
                statCateId: '161',
            },{
                name: '钢绞线',
                statCateId: '162',
            },{
                name: '板材',
                statCateId: '163',
            }
        ]
    }
]
class EntCateFilter extends React.Component {
    constructor(props) {
        super(props);
        this.btnItemList =[
            {name: '城建物资', icon: placeholderImg, type: 'ent'},
            {name: '公路桥梁', icon: placeholderImg, type: 'ent'},
            {name: '住总住博', icon: placeholderImg, type: 'ent'},
            {name: '上海砼', icon: placeholderImg, type: 'ent_cate'},

            {name: '隧道工程', icon: placeholderImg, type: 'cate'},
            {name: '水务建设', icon: placeholderImg, type: 'cate'},
            {name: '自来水管线', icon: placeholderImg, type: 'cate'},
        ];
        this.onEntItemClick = this.onEntItemClick.bind(this);
        this.onCateItemClick = this.onCateItemClick.bind(this);
    }

    onEntItemClick = (ent) => {
    };
    onCateItemClick = (cateId) => {
        console.log(cateId)
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
                            <GridBox column="4" data={this.btnItemList}
                                     renderItem={item=>(
                                         <div style={{paddingTop: '10px', width: '100%'}}>
                                             {item.icon ? <img src={item.icon} style={itemIconStyle}/>: <div style={itemIconStyle}/>}

                                             <p style={{fontSize:'13px'}} className="half-margin-p">{item.name}</p>
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
                                categories.map((category) => {
                                    return <CateSelectPanel key={category.statCateId} onClick={this.onCateItemClick} cate={category}/>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}
const ConnectedEntCateFilterView = connect(mapStateToProps, mapDispatchToProps)(EntCateFilter)
export default ConnectedEntCateFilterView;