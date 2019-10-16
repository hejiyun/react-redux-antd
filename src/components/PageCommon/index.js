import React from 'react'
import { withRouter } from 'react-router-dom'
import { Pagination, LocaleProvider  } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import axios from 'axios'

// 此组件为单独研究公用分页组件,发现本身 antd中table带分页, 所以搁置, 如果需要使用,需完善 父组件调用子组件getList方法, 参见,table组件.
class PageCommon extends React.Component{
    state = {
        pageNumber: 1,
        pageSize: 10,
        total: 100,
        params: {}
    }
    // 当前页改变时,触发的方法
    onChange = (pageNumber) => {
        this.setState({
            pageNumber: pageNumber
        })
        Object.assign({}, this.state.params, { pageNumber: pageNumber })
        this.getList(this.state.params)
    }

    // 当前页数改变时,触发的方法.
    onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
        this.setState({
            pageSize: pageSize
        })
        Object.assign({}, this.state.params, { pageNumber: current })
        Object.assign({}, this.state.params, { pageSize: pageSize })
        this.getList(this.state.params)
    }

    // 获取当前参数所请求的数据列表
    getList = (params) => {
        const _this = this
        this.props.isLoading(true)
        axios.get('https://result.eolinker.com/XWHkewC202109af5ad44cd0893e8954bba2342eb59f7bbf?uri=/getList').then(res => {
            console.log(res, 'getli')
            _this.processing(res)
        }).catch(e => {
            console.log(e)
        }).finally(
            this.props.isLoading(false)
        )
    }

    // 处理请求的数据
    processing = (res) => {
        if (res.data.list) {
          const data = res.data 
          this.setState({
              total: data.total
          })
        //   data.list.map(item => {
        //     for (var k in item) {
        //       if (item[k] === '' || item[k] === null) {
        //         item[k] = ''
        //       }
        //     }
        //   })
         // 处理数据完成后, 调用父方法,发送数组 
          this.props.senList(data.list)
        } else if (res.data.data.list) {
            const data = res.data.data
            this.setState({
                total: data.total
            })
            // data.list.map(item => {
            //   for (var k in item) {
            //     if (item[k] === '' || item[k] === null) {
            //       item[k] = ''
            //     }
            //   }
            // })
            // 处理数据完成后, 调用父方法,发送数组 
            this.props.senList(data.list)
        }
    }

    // 组件创建后, 请求一次参数
    componentDidMount() {
        // this.getList()
    }

    // 组件创建前, 获取当前请求的参数
    componentWillMount() {
        if (this.props.params) {
            this.setState({
                params: this.props.params
            })
        }
    }

    render() {
        const { pageNumber, pageSize, total, params } = this.state
        return (
            <div>
                <LocaleProvider locale={zhCN}>
                    <Pagination
                        showQuickJumper
                        showTotal={total => `总共 ${total} 条`}
                        showSizeChanger
                        onShowSizeChange={this.onShowSizeChange}
                        pageSize={pageSize}
                        total={total}
                        current={pageNumber}
                        onChange={this.onChange}
                        />
                        {params.name}
                </LocaleProvider>
            </div>
        )
    }
}

export default withRouter(PageCommon)