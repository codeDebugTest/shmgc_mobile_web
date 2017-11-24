import React from 'react'
import {Flex} from 'antd-mobile'

const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
export default class CatePickerPanel extends React.Component{
    constructor(props) {
        super(props);
    }
    onCateSelect =(cate) => {
        this.props.onClick(cate);
    }

    renderChild = (cateChildren) => {
        const btnStyle = {margin: '5px 8px 8px', border: '0', backgroundColor: '#fff',  color: '#008ae6', fontSize: '13px'};
        if (cateChildren && cateChildren.length) {
            return (
                <div style={{flexGrow: 0}}>
                    <Flex wrap="wrap" style={{marginLeft: '10px', fontSize: '14px'}}>
                        {
                            cateChildren.map((childCate) => {
                                return <button style={btnStyle} key={childCate.value}
                                               onClick={()=> this.onCateSelect(childCate)}
                                >{childCate.label}</button>
                            })
                        }
                    </Flex>
                </div>

            )
        }
        return null;
    }
    render() {
        const itemIconStyle = {width:'50px', height: '50px'};
        const cate = this.props.cate;
        return (
            <div style={{display: 'flex', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid #ddd'}}>
                <div onClick={() => this.onCateSelect(cate)} style={{flexGrow: 0, flexBasis:'60px', flexShrink: 0}}>
                    <img src={placeholderImg} style={itemIconStyle}/>
                    <p style={{fontSize:'13px'}} className="half-margin-p">{cate.label}</p>
                </div>

                {this.renderChild(cate.children)}
            </div>
        )
    }
}
