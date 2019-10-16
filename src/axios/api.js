import { get, put, post, del } from './request'

export default {

// 1.获取订单列表
getList: (params) => post('/api/getList', params),


// 2.获取列表详情
getOrderDetail: (params) => get(`/api/getDetail?id=${params}`),

// 3.删除订单项
delCurrentOrder: (params) => del('/api/delOrder', params),

// 4.修改订单
editCurrentOrder: (params) => put(`/api/editOrder?id=${params}`),

// 5. 获取商品列表
getPro: () => post('/api/getPro')
  
}
