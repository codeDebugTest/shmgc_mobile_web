const placeholderImg = 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';
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


export function getDefaultTimeLocationCondition () {
    return {
        cutoffTime: '10',
        otherTime: null,
        quarter: null,
        location: null,
        timeByAttr: null
    }
};

export function getFilterCondition(pickerCondition) {
    const condition = {location: pickerCondition.location && pickerCondition.location.id};
    if (pickerCondition.timeByAttr === 'quarter') {
        const quarter = pickerCondition.quarter;
        if (quarter) {
            condition.pbBeginDate = '2017-' + ((quarter -1) * 3 + 1);
            condition.pbEndDate = '2017-' + ((quarter -1) * 3 + 3);
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