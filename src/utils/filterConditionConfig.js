const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
export const logoList = [
    'cjwz-logo','sdgc-logo','lqjt-logo','shtong-logo',
    'concrete-logo','cement-logo','steel-logo','img-all-logo'
];
export const logoClassList ={
    '城建物资': 'cjwz-logo',
    '路桥集团': 'lqjt-logo',
    '水务建设': 'swjs-logo',
    '自来水管线': 'zlsgx-logo',
    '隧道股份': 'sdgf-logo',
    '隧道工程': 'sdgc-logo',
    '市政工程': 'szgc-logo',

    '混凝土': 'concrete-logo',
    '水泥': 'cement-logo',
    '钢材': 'steel-logo',
    '金属管材': 'jsgc-logo',
    '玻璃钢管材': 'blggc-logo',
    '预制构件': 'yzgj-logo',
    '防水防潮材料': 'fsfccl-logo',

    '上海砼': 'shtong-logo',
    '全部': 'img-all-logo',
    'other': 'other-logo'
}
export function getThreeEntForBtn(source) {
    const ents = [];
    source.forEach((ent)=> {
        if (ent.shortName === '城建物资' || ent.shortName === '隧道工程' || ent.shortName === '路桥集团') {
            ents.push({
                type: 'ent',
                icon: placeholderImg,
                name: ent.shortName,
                entId: ent.entId
            });
        }
    })

    return ents;
}

export function getThreeCateForBtn(source) {
    //三大主材：钢材，混凝土，水泥
    const cates = [];
    source.forEach((cate)=> {
        if (cate.name === '混凝土' || cate.name === '水泥' || cate.name === '钢材') {
            cates.push({
                type: 'cate',
                icon: placeholderImg,
                name: cate.name,
                cateId: cate.statCateId
            });
        }
    })
    return cates;
}

const  filterLocationLength = 12;
export function getFilterLoactions (source) {
    if (source && source.locations) {
        return source.locations.slice(0, filterLocationLength);
    } else {
        return testFilterLocations;
    }
}


export const testFilterBtns = [
    {name: '城建物资', icon: placeholderImg, type: 'ent'},
    {name: '公路桥梁', icon: placeholderImg, type: 'ent'},
    {name: '住总住博', icon: placeholderImg, type: 'ent'},
    {name: '上海砼', icon: placeholderImg, type: 'ent_cate'},

    {name: '混凝土', icon: placeholderImg, type: 'cate'},
    {name: '水泥', icon: placeholderImg, type: 'cate'},
    {name: '钢材', icon: placeholderImg, type: 'cate'},
    {name: '全部', icon: '', type: 'all'},
]
export const testFilterLocations =[
    {
        id: '10',
        value: '上海',
        type: '1'
    },{
        id: '11',
        value: '南京',
        type: '1'
    },{
        id: '12',
        value: '苏州',
        type: '1'
    },{
        id: '13',
        value: '杭州',
        type: '1'
    },{
        id: '14',
        value: '济南',
        type: '1'
    },{
        id: '15',
        value: '武汉',
        type: '1'
    },{
        id: '16',
        value: '厦门',
        type: '1'
    }
];
export const testFilerEnts = [
    {
        entId: '11',
        shortName: '城建物资',
    },{
        entId: '12',
        shortName: '公路桥梁',
    },{
        entId: '13',
        shortName: '住总住博',
    },{
        entId: '14',
        shortName: '隧道工程',
    },{
        entId: '15',
        shortName: '水务建设',
    },{
        entId: '16',
        shortName: '自来水管线',
    }
]
const testCategories = [
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

const copyCateChildren = (children, parentId) => {
    const result = [{label: '全部', value: parentId + '-全部'}];
    children.map((cate) => {
        result.push({label: cate.name, value: cate.statCateId + '-' + cate.name});
    })
    return result;
};

export function getFilterCategories (source) {
    if (source && source.statCategories) {
        const result = [];
        source.statCategories.map((cate) => {
            if (cate.children && cate.children.length > 0) {
                result.push({label: cate.name, value: cate.statCateId + '-' + cate.name, children: copyCateChildren(cate.children, cate.statCateId)})
            } else {
                result.push({label: cate.name,  value: cate.statCateId + '-' + cate.name, children: [{label: '全部', value: cate.statCateId + '-全部'}]})
            }
        })
        return result;
    } else {
        return testCategories;
    }
}

export function getRequestTimeLocationCondition(pickerCondition) {
    const condition = {location: pickerCondition.location && pickerCondition.location.id};
    if (pickerCondition.timeByAttr === 'quarter') {
        const quarter = pickerCondition.quarter;
        if (quarter) {
            condition.pbBeginDate = '2017-' + ((quarter.value -1) * 3 + 1);
            condition.pbEndDate = '2017-' + ((quarter.value -1) * 3 + 3);
            return condition;
        }
    } else if(pickerCondition.timeByAttr === 'otherTime') {
        const otherTime = pickerCondition.otherTime;
        if (otherTime) {
            condition.pbBeginDate = otherTime.startTime;
            condition.pbEndDate = otherTime.endTime;
            return condition;
        }
    } else if (pickerCondition.timeByAttr === 'cutoffTime') {
        const cutoffTime = pickerCondition.cutoffTime;
        if (cutoffTime) {
            condition.pbBeginDate = '2017-' + cutoffTime;
            condition.pbEndDate = '2017-' + cutoffTime;
            return condition;
        }
    }

    condition.pbBeginDate = null;
    condition.pbEndDate = null;
    return condition;
}

export function getRequestCateEntCondition(condition) {
    const result = {};
    if (condition && condition.ent) {
        result.entId = condition.ent.entId
    }
    if (condition && condition.cate) {
        result.cateId = condition.cate[1]
    }
    return result
}