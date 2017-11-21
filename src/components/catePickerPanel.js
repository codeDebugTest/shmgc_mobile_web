import React from 'react'
import {Flex} from 'antd-mobile'

const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
export default class CatePickerPanel extends React.Component{
    constructor(props) {
        super(props);
    }
    onCateSelect =(statCateId) => {
        this.props.onClick(statCateId);
    }

    renderChild = (cateChildren) => {
        const btnStyle = {margin: '5px 8px 8px', border: '0', backgroundColor: '#fff',  color: '#008ae6'};
        if (cateChildren && cateChildren.length) {
            return (
                <Flex wrap="wrap" style={{marginLeft: '10px', fontSize: '14px'}}>
                    {
                        cateChildren.map((childCate) => {
                            return <button style={btnStyle} key={childCate.statCateId}
                                           onClick={()=> this.onCateSelect(childCate.statCateId)}
                            >{childCate.name}</button>
                        })
                    }
                </Flex>
            )
        }
        return null;
    }
    render() {
        const itemIconStyle = {width:'50px', height: '50px'};
        const cate = this.props.cate;
        return (
            <div style={{display: 'flex',alignItems: 'center', padding: '5px 0', borderBottom: '1px solid #ddd'}}>
                <div onClick={() => this.onCateSelect(cate.statCateId)}>
                    <img src={placeholderImg} style={itemIconStyle}/>
                    <p style={{fontSize:'14px'}} className="half-margin-p">{cate.name}</p>
                </div>

                {this.renderChild(cate.children)}
            </div>
        )
    }
}