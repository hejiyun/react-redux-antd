import React from 'react'
import {withRouter } from 'react-router';
import BreadcrumbBar from '../../components/Breadcrumb/index'
import TableCommon from '../../components/TableCommon/index'
import {Divider, Button, Popconfirm } from 'antd'
import SearchCommon from '../../components/SearchCommon/index'
import moment from 'moment'


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
        case 'searchCommon':
          this.searchCommon = ref
          break
        default:
          break
      }
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
    //获取搜索框搜索参数
    getSearchParams = (params) => {
      console.log('点击搜索后获取的对象', params)
      console.log(params.order[0])
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
        // 导出选项参数
        const ExportOptions = {
            method: 'get',
            url: '/Export',
            data: {
                name: '123'
            }
        }

        // 搜索框选项参数
        const searchOptions = [
            {
                label: '订单号',
                key: 'orderNo',
                type: 'checkBox',
                notice: '请输入订单号',
                placeholder: '请输入订单号',
                checked: true
            },
            {
                label: '收件人',
                key: 'receiver',
                type: 'NumberInput',
                notice: '请输入收件人',
                placeholder: '请输入收件人',
                max: 100000,
                step: 0.01
            },
            {
                label: '地址',
                key: 'address',
                type: 'select',
                notice: '请输入地址',
                placeholder: '请输入地址',
                rule: true,
                defaultValue: ['all'],
                options: [
                    {
                        label: '张三',
                        value: 'jack'
                    },
                    {
                        label: '李四',
                        value: 'rose'
                    },
                    {
                        label: '王五',
                        value: 'tom'
                    }
                ]
              
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
                <SearchCommon searchOptions={searchOptions} ExportOptions={ExportOptions}  getSearchParams={this.getSearchParams.bind(this)} onRef={this.onRef.bind(this)}/>
                {/* 当有多子组件需要被父组件调用方法时, 使用onRef函数进行操作 https://blog.csdn.net/xingxingxingge/article/details/94382553 */}
                <TableCommon columns={columns}  requestMsg={requestMsg} pageSizeOptions={pageSizeOptions} onRef={this.onRef.bind(this)}/>
                </div>
            </div>
        )
    }
}
export default withRouter(orderList)