import http from './httpRequest';
import {SERVER_HOST} from './config'

const RestApiUrl = {
    userLogin: SERVER_HOST + '/user/login',
    homePageData: SERVER_HOST + '/homePageData',
    purchaseItems: SERVER_HOST + '/purchaseItems',
    statistic: SERVER_HOST + '/statistic',
    entList: SERVER_HOST + '/entList',
    entCompareData: SERVER_HOST + '/entCompareData',
}

export function fetchHomePageData(params) {
    /* Todo get resource by http request*/
    // return http.get(RestApiUrl.homePageData, params);
    return new Promise((resolve, reject) =>{
       setTimeout(()=> resolve({
           return_code: 0,
           result: {
               projectStat: [
                   {type: '总数', count: 600}, {type: '进行中', count: 100}, {type: '已结束', count: 500},
                   {type: '比价', count: 400}, {type: '招标', count: 200}, {type: '协议', count: 0},
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
           }
       }), 1000);
    });
}

export function fetchPurchaseItems(params) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> resolve({
            return_code: 0,
            result: []
        }), 1000);
    })
}

export function fetchStaticOverviewData(params) {
    // return http.post(RestApiUrl.statistic, params);
    return new Promise((resolve, reject) => {
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
    })
}

export function fetchEntOverviewData(params) {
    // return http.post(RestApiUrl.entList, params);
    return new Promise((resolve, reject) => {
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
    })
}

export function fetchEntCompareData(params) {
    // return http.post(RestApiUrl.entCompareData, params);
    return new Promise((resolve, reject) => {
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
    })
}