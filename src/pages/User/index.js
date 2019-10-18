import React from 'react'
import BreadcrumbBar from '../../components/Breadcrumb/index'
import SearchCommon from '../../components/SearchCommon/index'
import moment from 'moment'

class User extends React.Component{


    // 用于在父组件中调用子组件方法.
    onRef = (name, ref) => {
        switch (name) {
        case 'searchCommon':
            this.searchCommon = ref
            break
            default:
            break
        }
    }
   
    getSearchParams = (params) => {
        console.log('点击搜索后获取的对象', params)
        console.log(params.order[0])
    }
    /*
      子组件给父组件传值:   父组件在子组件上定义 getSearchParams1={this.getSearchParams.bind(this)},
           然后子组件 this.props.getSearchParams1('searchCommon') 就可以将参数 searchCommon传递给父组件, 父
           组件使用  getSearchParams = (params) => {
                        console.log(params)
                    } 
                    接收

       父组件调用子组件方法: 
          1.通过定义 onRef方法. 直接调用子组件方法.https://blog.csdn.net/xingxingxingge/article/details/94382553
    
    */

    render() {
        const ExportOptions = {
            method: 'get',
            url: '/Export',
            data: {
                name: '123'
            }
        }

        const searchOptions = [
            {
                label: '订单号',
                key: 'orderNo',
                type: 'input',
                notice: '请输入订单号',
                placeholder: '请输入订单号',
            },
            {
                label: '收件人',
                key: 'receiver',
                type: 'input',
                notice: '请输入收件人',
                placeholder: '请输入收件人'
            },
            {
                label: '地址',
                key: 'address',
                type: 'input',
                notice: '请输入地址',
                placeholder: '请输入地址',
                rule: true
               
            },
            {
                label: '电话',
                key: 'phone',
                type: 'input',
                notice: '请输入电话',
                placeholder: '请输入电话',
            },
            {
                label: '金额',
                key: 'money',
                type: 'input',
                notice: '请输入金额',
                placeholder: '请输入金额',
                rule: true
            },
            {
                label: '排名',
                key: 'order',
                type: 'data',
                notice: '请输入排名',
                placeholder: '请输入排名',
                defaultValue: [moment('2015/01/01','YYYY/MM/DD'), moment('2015/01/01', 'YYYY/MM/DD')],
                dateFormat: 'YYYY/MM/DD'
            }

        ]



        return (
            <div>
                <BreadcrumbBar arr={['用户']}/>
                <div className="boxContainer">
                    <SearchCommon searchOptions={searchOptions} ExportOptions={ExportOptions}  getSearchParams={this.getSearchParams.bind(this)} onRef={this.onRef.bind(this)}/>
                用户设置
                </div>
            </div>
        )
    }
}
export default User