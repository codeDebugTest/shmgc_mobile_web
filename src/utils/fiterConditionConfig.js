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

export function getLocationByLength(source, length) {
    return source.slice(0, (length < source.length ? source.length : length));
}