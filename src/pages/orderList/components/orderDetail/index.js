import React from 'react'
import BreadcrumbBar from '../../../../components/Breadcrumb/index'
import { withRouter } from 'react-router-dom'
import DescriptionsCommon from '../../../../components/Descriptions/index'
import api from '../../../../axios/api'

class orderDetail extends React.Component{
    state = {
        ObjectView: {},
        DpOptions: []
    }

    async componentWillMount() {
      // 获取路由参数, 如果忽略match可能造成取不到值
      const id = this.props.match.params.id
      const res = await api.getOrderDetail(id)
      this.setState({
        ObjectView: res.data.data
      })
    }

    render() {
        const DpOptions = [
            {
              name: '姓名',
              span: 2,
              key: 'name'
            }, 
            {
              name: '年龄',
              key: 'age'
            },
            {
              name: '订单',
              key: 'orderNo' 
            },
            {
              name: '地址',
              key: 'address' 
            },
            {
              name: '性别',
              key: 'key' 
            },
            {
              name: '时间',
              key: 'createTime'
            },
            {
              name: '供应商',
              key: 'vendCustName'
            }
        ]
        return (
            <div>
                <BreadcrumbBar arr={[{title: '订单列表', to: '/orderList'}, '订单详情']}/>
                <div className="boxContainer">
                  <DescriptionsCommon title={'订单基本信息'} ObjectView={this.state.ObjectView} DpOptions={DpOptions}/>
                </div>
            </div>
        )
    }
}
export default withRouter(orderDetail)