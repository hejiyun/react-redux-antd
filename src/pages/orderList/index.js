import React from 'react'
import {withRouter } from 'react-router';
import BreadcrumbBar from '../../components/Breadcrumb/index'
import TableCommon from '../../components/TableCommon/index'
import {Divider, Button, Popconfirm } from 'antd'


class orderList extends React.Component{
    state = {
        loading: false
    } 

    componentDidMount() {
        // console.log(this.props)
        // console.log('chuangjian')
    }
    
    // 用于在父组件中调用子组件方法.
    onRef = (name, ref) => {
      console.log(name)
      switch (name) {
        case 'tableCommon':
          this.tableCommon = ref
          break
          default:
            break
      }
    }

    handleDelete = (key) => {
      console.log(key)
      // 进行完删除操作之后, 重新请求列表信息更新页面
      this.tableCommon.getList()
    }

    /**
     *
     * 查看当前行详情调用方法
     * @memberof orderList
     */
    viewDetail = (record) => {
      // 执行跳转之前的操作
      console.log(record.key)
      // 跳转路由
      this.props.history.push(`/orderList/orderDetail/${record.key}`)
    }


    render() {

        // table数据变化时,请求的地址和方式.以及是否有默认参数: 每次请求都需要携带的参数.
        const requestMsg = {
            method: 'post',
            url: '/api/getList',
            defaultParams: {
            }
        }

        // 控制每条/页 
        const pageSizeOptions = ['10', '30', '40', '50']

        // table的表头项
        const columns = [
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: 100,
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: 100,
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <span>
                  <Button type="link" onClick={this.viewDetail.bind(this, record)}>查看</Button>
                  <Divider type="vertical" />
                  <Popconfirm title="您确认要删除吗?" onConfirm={() => this.handleDelete(record.key)}>
                    <Button type="link">删除</Button>
                  </Popconfirm>
                </span>
              ),
            },
          ];
        return (
            <div>
                <BreadcrumbBar arr={['订单列表']}/>
                <div className="boxContainer">
                <p className="app-title-more">后台管理系统类别</p>
                {/* 当有多子组件需要被父组件调用方法时, 使用onRef函数进行操作 https://blog.csdn.net/xingxingxingge/article/details/94382553 */}
                <TableCommon columns={columns}  requestMsg={requestMsg} pageSizeOptions={pageSizeOptions} onRef={this.onRef.bind(this)}/>
                </div>
            </div>
        )
    }
}
export default withRouter(orderList)