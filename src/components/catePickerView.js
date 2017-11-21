import React from 'react'
import DropDownView from "./dropDownView";
import {Menu} from 'antd-mobile'

const data = [
    {
        value: '1',
        cateId: '1',
        label: '混凝土',
        children: [
            {
                label: '全部',
                value: '100',
            },{
                label: 'C15',
                value: '101',
            },{
                label: 'C20',
                value: '102',
            }, {
                label: 'C25',
                value: '103',
            },{
                label: 'C30',
                value: '104',
            },{
                label: 'C35',
                value: '105',
            },{
                label: 'C40',
                value: '106',
            },{
                label: 'C45',
                value: '107',
            },{
                label: 'C50',
                value: '108',
            },{
                label: 'C55',
                value: '109',
            },{
                label: 'C60',
                value: '110',
            },{
                label: 'C65',
                value: '111',
            },{
                label: 'C70',
                value: '112',
            },
        ],
    }, {
        value: '2',
        label: '水泥',
        children: [
            {
                label: '全部',
                value: '200',
            }, {
                label: '桥梁支柱',
                value: '201',
            }, {
                label: '预制柱',
                value: '202',
            }, {
                label: '预制梁',
                value: '203',
            },{
                label: '桥箱梁',
                value: '204',
            }, {
                label: '桥梁构建',
                value: '205',
            }, {
                label: '预制内墙板',
                value: '206',
            },{
                label: '预制飘窗版',
                value: '207',
            }, {
                label: '预制楼梯',
                value: '208',
            }, {
                label: '预制外墙板',
                value: '209',
            },{
                label: '预制构件',
                value: '210',
            }
        ],
    }, {
        value: '3',
        label: '钢筋',
        children: [
            {
                label: '全部',
                value: '300',
            },{
                label: '螺纹钢',
                value: '301'
            },{
                label: '角铁',
                value: '302'
            },{
                label: 'H型钢',
                value: '304'
            },{
                label: '角钢',
                value: '305'
            },{
                label: '钢板',
                value: '306'
            },{
                label: '槽钢',
                value: '307'
            },{
                label: '盘螺',
                value: '308'
            },{
                label: '圆钢',
                value: '309'
            },{
                label: '高线',
                value: '310'
            }
        ],
    },
];
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
                <Menu data={data} onChange={this.onSelectChanged} value={this.selectedCate}/>
            </DropDownView>
        )
    }
}
