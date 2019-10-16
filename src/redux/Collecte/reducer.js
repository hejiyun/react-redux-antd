import * as pro from './action-type'
// 自测Immutable的方法意义, 类似后台java语言方法.
import Immutable from 'immutable';

let defaultState = {
    dataList: [],
    prod: []
}

// reducer的作用就是用来执行增删改查各类操作, 将数据源进行读写.
//    总体步骤分为: 1. 使用list方法拿出数据源
//                 2. 使用Map方法,拿出数据源中的某一项数据(要操作的对象)
//                 3. 使用set方法, 把action中的属性,重新赋值给选中的数据
//                 4. 然后使用set, 把改变后的数据项,重新赋值给之前它在的位置,进行替换
//                 5. 以上就更新完数据了, 然后把更新后的数据源返回出来.


//   这里的action就是同文件下action.js中对应方法中所return出来的结果集合
      // 比如  pro.EDITPRODUCTION 中的action就是action.js中 editPro方法执行后所返回的集合
    //   editPro函数return出的集合里,就可以填入我们执行该方法所想保存的属性, 填一个属性就对应在editPro的形参中加一个属性值,
    //   因为return出的集合中的值都是通过外部执行这个editPro方法所加入的参数得到的


export const proData = (state = defaultState, action) => {
    let immuDataList; // 用于存储操作数据源
    let immuItem; // 用于存储当前需要操作的数据
    // 使用switch-case条件语句来进行业务逻辑区分
    switch (action.type) {

        // 如果操作类型是获取Data
        case  pro.GETPRODUCTION:
            return {...state, ...action}

        //如果操作类型是切换选中
        case pro.TOGGLESELECT:
            //首先使用List方法 获取到操作数据源
            immuDataList = Immutable.List(state.dataList)
            //然后使用Map方法,选择出需要操作的元素
            immuItem = Immutable.Map(state.dataList[action.index])
            //然后使用set方法,改变选中元素的选中状态, 用get方法获取当前状态再取反,达到切换效果
            immuItem = immuItem.set('selectStatus', !immuItem.get('selectStatus'))
            //然后把修改的数据写入到数据源中,进行替换
            immuDataList = immuDataList.set(action.index, immuItem)
            // 完成后, 再将新的数据源返回出来
            return {...state, ...{dataList: immuDataList.toJS()}}

        // 如果操作类型是添加数字
        case pro.EDITPRODUCTION: 
            immuDataList = Immutable.List(state.dataList)
            immuItem = Immutable.Map(state.dataList[action.index])
            // 然后使用set方法,修改操作元素的值, 如果不用循环的话, 就是对应action中添加商品的方法,要设置多少个需要的属性,就set多少行
            immuItem = immuItem.set('selectNum', action.selectNum)
            immuItem = immuItem.set('name', action.name)
            immuDataList = immuDataList.set(action.index, immuItem)
            return {...state, ...{dataList: immuDataList.toJS()}}
        
        //如果操作类型是添加数据
        case pro.ADDPRODUCTION:
            immuDataList = Immutable.List(state.prod)
            immuItem = Immutable.Map(state.prod[action.index])
            // 这里判断不能用immuItem/!immuItem,因为Map取出的是一个对象, 可以通过 size是否为0来判断是否有初始值
            if (immuItem.size !== 0) {
                immuDataList = immuDataList.set(action.index, action.prod)
            } else {
                immuDataList = immuDataList.push(action.prod)
            }
            return {...state, ...{prod: immuDataList.toJS()}}

        //如果操作类型是删除数据
        case pro.DELPRODUCTION:
            console.log(action.item, '数组')
            immuDataList = Immutable.List(state.prod)
            console.log(immuDataList, '删除前数据')
            console.log(state.prod)
            let current
            for (let i = 0; i < state.prod.length; i ++) {
               if (state.prod[i].name === action.item.name) {
                   current = i
               }
            }
            immuDataList = immuDataList.delete(current)
            console.log(immuDataList, '删除后数组')
            return {...state, ...{prod: immuDataList.toJS()}}

        //如果操作类型是清除数字
        case pro.CLEARSELECTED:
             // 获取state数据中的数组集合
             immuDataList = Immutable.fromJS (state.dataList);
             //遍历数组集合,通过set方法设置每个元素的值 状态
             for (let i = 0; i < state.dataList.length; i ++) {
                 immuDataList = immuDataList.update ( i, item => {
                     item = item.set('selectStatus', false);
                     item = item.set ('selectNum', 0);
                     return item;
                 })
             }
             //返回写入数据的新集合对象
             return {...state, ...{dataList: immuDataList.toJS()}};
        default: 
             return state; 
    }
}
