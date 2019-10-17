import React from 'react'
import BreadcrumbBar from '../../components/Breadcrumb/index'
import SearchCommon from '../../components/SearchCommon/index'

class User extends React.Component{


    // 用于在父组件中调用子组件方法.
    onRef = (name, ref) => {
        console.log(name)
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
            data: {}
        }
        return (
            <div>
                <BreadcrumbBar arr={['用户']}/>
                <div className="boxContainer">
                    <SearchCommon ExportOptions={ExportOptions}  getSearchParams={this.getSearchParams.bind(this)} onRef={this.onRef.bind(this)}/>
                用户设置
                </div>
            </div>
        )
    }
}
export default User