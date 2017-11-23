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

export function getFilterLoactions (source) {
    if (source && source.locations) {
        return source.locations.slice(0, filterLocationLength);
    } else {
        return testFilterLocations;
    }
}

export const  filterLocationLength = 12;

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
]