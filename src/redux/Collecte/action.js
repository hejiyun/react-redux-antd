import * as pro from './action-type'

// 当组件调用获取数据方法时,返回记录此时的数据信息作为初始化数据类型.可以在此处通过async await 
//异步转同步方法请求后台地址获取参数,并将结果数据项作为dataList参数值传递给state的dataList属性.

export const getProData = () => {
    return {
        type: pro.GETPRODUCTION, //给返回的对象中添加type属性的作用是在reducer文件中,可以通过type属性来判断是什么数据操作类型
        dataList: [ {selectNum: 1, name: 'zs'}, {selectNum: 2, name: 'ls'}, {selectNum: 3, name: 'wa'}, {selectNum: 4, name: 'heiha'} ]
    }
}

// 保存切换状态的函数
export const togSelectPro = index => {
    return {
        type: pro.TOGGLESELECT,
        index
    }
}

/**
 * 保存修改属性的方法
 *  想保存住多少个操作属性就填多少个形参和集合属性,
 *   比如 目前想保存一个selectNUm, 那么形参就填入 index, selectNum  , 集合返回 { type:... , index, selectNum}
 *   比如 目前想保存一个selectANUm后,还想保存一个name, 那么就如方法里一样,, 形参中加入一个name, 集合返回加入一个name
 *   当然也可以把selectNum作为一个集合传入
 */
export const editPro = (index, selectNum, name) => {
    console.log(2)
    return {
        type: pro.EDITPRODUCTION,
        index,
        selectNum,
        name
    }
}


export const addPro = (index, prod) => {
    return {
        type: pro.ADDPRODUCTION,
        index,
        prod
    }
}


export const delPro = (index, item) => {
    return {
        type: pro.DELPRODUCTION,
        index,
        item
    }
}

export const clearSelect = () => {
    return {
        type: pro.CLEARSELECTED
    }
}
