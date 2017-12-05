import http from './httpRequest';
import {SERVER_HOST, NAME_SPACE} from './config'

const RequestType = {
    userLogin: 'USER_LOGIN',
    homeOverView: 'HOME_OVERVIEW',
    purchaseItems: 'PURCHASE_ITEM_LIST',
    purchaseItemDetail: 'PURCHASE_ITEM_DETAIL',
    statistic: 'STATIC_OVERVIEW',
    entList: 'ENT_LIST_OVERVIEW',
    entCompare: 'ENT_COMPARISION',
    shangHaiTong: 'CJWZ_CONCRETE_STATIC_OVERVIEW',
    cate_price_trend: 'CATE_PRICE_TREND'
};

const restUrl = SERVER_HOST + NAME_SPACE;

export function loginRequest(params) {
    return http.post(restUrl, {requestType: RequestType.userLogin, ...params});
}

export function fetchHomePageData(params) {
    return http.post(restUrl, {requestType: RequestType.homeOverView, ...params});
    /*return new Promise((resolve, reject) =>{
       setTimeout(()=> resolve({
           return_code: 0,
           result: [{
               projectStat: [
                   {display: '总数', countStr: 600}, {display: '进行中', countStr: 100}, {display: '已结束', countStr: 500},
                   {display: '比价', countStr: 400}, {display: '招标', countStr: 200}, {display: '协议', countStr: 0},
               ],
               totalAmountStr: '2,300,100.00元',
               amountOfCate: [
                   {
                       cateName: '混凝土',
                       amountStr: '10,000'
                   },{
                       cateName: '钢筋',
                       amountStr: '11,000'
                   },{
                       cateName: '水泥',
                       amountStr: '12,000'
                   },{
                       cateName: '其他',
                       amountStr: '30,000'
                   }
               ],
               groupByEnt:[
                   {
                       entName: '城建物资',
                       purchaseAmount: '14000',					//采购金额
                       piCount: 	'123'				//项目数
                   },{
                       entName: '公路桥梁',
                       purchaseAmount: '11800',					//采购金额
                       piCount: 	'100'				//项目数
                   },{
                       entName: '隧道路桥',
                       purchaseAmount: '12500',					//采购金额
                       piCount: 	'110'				//项目数
                   },{
                       entName: '水务建设',
                       purchaseAmount: '13000',					//采购金额
                       piCount: 	'150'				//项目数
                   },{
                       entName: '住总住博',
                       purchaseAmount: '12000',					//采购金额
                       piCount: 	'115'				//项目数
                   }
               ],
               axisRange: {
                   purchaseAmount: {
                       min: 11000,
                       max: 15000
                   },
                   piCount: {
                       min: 90,
                       max: 160
                   }
               }
           }]
       }), 1000);
    });*/
}

export function fetchPurchaseItems(params) {
    return http.post(restUrl, {requestType: RequestType.purchaseItems, ...params});
    /*return new Promise((resolve, reject) => {
        setTimeout(()=> resolve({
            return_code: 0,
            result: [
                {
                    piId: '111',
                    piTitle: '上海轨道交通18号线',
                    piType: '比价',
                    pitStatus: '进行中',
                    cutoffTimeStr: '17.12.11',
                    entId: '11111',
                    entName: '城建物资',
                    piProdDesc: '混凝土',
                    city: '上海'
                },{
                    piId: '121',
                    piTitle: '南汇小学',
                    piType: '比价',
                    pitStatus: '已结束',
                    cutoffTimeStr: '17.11.11',
                    entId: '11111',
                    entName: '城建物资',
                    piProdDesc: '水泥',
                    city: '上海'
                },{
                    piId: '122',
                    piTitle: '南昌临空经济区',
                    piType: '招标',
                    pitStatus: '已结束',
                    cutoffTimeStr: '17.11.01',
                    entId: '11111',
                    entName: '水务建设',
                    piProdDesc: '钢筋',
                    city: '上海'
                },{
                    piId: '129',
                    piTitle: '南昌临空经济区',
                    piType: '招标',
                    pitStatus: '已结束',
                    cutoffTimeStr: '17.11.01',
                    entId: '11111',
                    entName: '水务建设',
                    piProdDesc: '钢筋',
                    city: '上海'
                },{
                    piId: '128',
                    piTitle: '南昌临空经济区',
                    piType: '招标',
                    pitStatus: '已结束',
                    cutoffTimeStr: '17.11.01',
                    entId: '11111',
                    entName: '水务建设',
                    piProdDesc: '钢筋',
                    city: '上海'
                },{
                    piId: '127',
                    piTitle: '南昌临空经济区',
                    piType: '招标',
                    pitStatus: '已结束',
                    cutoffTimeStr: '17.11.01',
                    entId: '11111',
                    entName: '水务建设',
                    piProdDesc: '钢筋',
                    city: '上海'
                },{
                    piId: '126',
                    piTitle: '南昌临空经济区',
                    piType: '招标',
                    pitStatus: '已结束',
                    cutoffTimeStr: '17.11.01',
                    entId: '11111',
                    entName: '水务建设',
                    piProdDesc: '钢筋',
                    city: '上海'
                },{
                    piId: '125',
                    piTitle: '南昌临空经济区',
                    piType: '招标',
                    pitStatus: '已结束',
                    cutoffTimeStr: '17.11.01',
                    entId: '11111',
                    entName: '水务建设',
                    piProdDesc: '钢筋',
                    city: '上海'
                }
            ]
        }), 1000);
    })*/
}

export function fetchPurchaseItemDetail(params) {
    return http.post(restUrl, {requestType: RequestType.purchaseItemDetail, ...params});
}

export function fetchStaticOverviewData(params) {
    return http.post(restUrl, {requestType: RequestType.statistic, ...params});
    /*return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve({
                return_code: 0,
                result: {
                    overview: {
                        purchaseAmountStr: '2,300,100.00元',			//采购金额
                        piCountStr: 	'123,122122个'				//项目数
                    },
                    groupByEnt:[
                        {
                            entName: '城建物资',
                            purchaseAmount: '14000',					//采购金额
                            piCount: 	'123'				//项目数
                        },{
                            entName: '公路桥梁',
                            purchaseAmount: '11800',					//采购金额
                            piCount: 	'100'				//项目数
                        },{
                            entName: '隧道路桥',
                            purchaseAmount: '12500',					//采购金额
                            piCount: 	'110'				//项目数
                        },{
                            entName: '水务建设',
                            purchaseAmount: '13000',					//采购金额
                            piCount: 	'150'				//项目数
                        },{
                            entName: '住总住博',
                            purchaseAmount: '12000',					//采购金额
                            piCount: 	'115'				//项目数
                        }
                    ],
                    groupByCate: [
                        {
                            cateName: '混凝土',
                            purchaseAmount: '120000',						//采购金额
                            piCount: 	'120',						//项目数
                            purchaseQuantity:	'120',				//采购数量
                            averagePrice: '1'						//采购均价
                        },
                        {
                            cateName: '水泥',
                            purchaseAmount: '130000',						//采购金额
                            piCount: 	'100',						//项目数
                            purchaseQuantity:	'50',				//采购数量
                            averagePrice: '2'						//采购均价
                        },
                        {
                            cateName: '钢筋',
                            purchaseAmount: '125000',						//采购金额
                            piCount: 	'150',						//项目数
                            purchaseQuantity:	'75',				//采购数量
                            averagePrice: '2'						//采购均价
                        },
                    ],
                    groupByTime:[]
                }
            });
        }, 1500);
    })*/
}

export function fetchSupplierStaticData(params) {
    return http.post(restUrl, {requestType: RequestType.shangHaiTong, ...params});
}

export function fetchEntOverviewData(params) {
    return http.post(restUrl, {requestType: RequestType.entList, ...params});
/*    return new Promise((resolve, reject) => {
        setTimeout(()=> resolve({
            return_code: 0,
            result: [
                {
                    entId: '121',
                    entName: '城建物资',
                    projectStat: [
                        {
                            display: '项目总数',
							countStr: 110
                        },{
                            display: '进行中',
							countStr:  20
                        },{
                            display: '已结束',
							countStr:  90
                        }
                    ]
                },{
                    entId: '100',
                    entName: '隧道工程',
                    projectStat: [
                        {
                            display: '项目总数',
                            countStr: 110
                        },{
                            display: '进行中',
                            countStr:  10
                        },{
                            display: '已结束',
                            countStr:  110
                        }
                    ]
                },{
                    entId: '111',
                    entName: '公路桥梁',
                    projectStat: [
                        {
                            display: '项目总数',
                            countStr: 80
                        },{
                            display: '进行中',
                            countStr:  10
                        },{
                            display: '已结束',
                            countStr:  70
                        }
                    ]
                },{
                    entId: '131',
                    entName: '水务建设',
                    projectStat: [
                        {
                            display: '项目总数',
                            countStr: 60
                        },{
                            display: '进行中',
                            countStr:  10
                        },{
                            display: '已结束',
                            countStr:  50
                        }
                    ]
                },{
                    entId: '132',
                    entName: '住总住博',
                    projectStat: [
                        {
                            display: '项目总数',
                            countStr: 50
                        },{
                            display: '进行中',
                            countStr:  2
                        },{
                            display: '已结束',
                            countStr:  48
                        }
                    ]
                }
            ]
        }), 1500);
    })*/
}

export function fetchEntCompareData(params) {
    return http.post(restUrl, {requestType: RequestType.entCompare, ...params});
/*    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({
            return_code: 0,
            result: {
                loadingSuccess: true,
                entList: ['城建物资', '隧道工程', '水务建设', '公路桥梁'],
                totalAmountStrList: ['3,000万', '3,000万','2,988万', '2,989万'],
                quantityStrList: ['--', '--', '--','--'],
                averagePriceStrList: ['--', '--', '--','--'],
                totalPiCountStrList: ['100', '100', '99', '103'],
                runningPiCountStrList: ['1', '1', '2', '0'],
                finishedPiCountStrList: ['99', '99', '98', '103']
            }
        }), 1000);
    })*/
}

export function fetchPriceTrendData(params) {
    return http.post(restUrl, {requestType: RequestType.cate_price_trend, ...params})
}