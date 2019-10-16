import React from 'react'
import { withRouter } from 'react-router-dom'
import { Table } from 'antd';
import Axios from 'axios';


class TableCommon extends React.Component {
  state = {
    // data 用于接收table列表数据
    data: [],
    // pagination 用于设置table表中分页器的整体样式.
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        // 控制跳转多少页
        showQuickJumper: true,
        // 控制显示总多少条
        showTotal: function(total) {
            return `总共 ${total} 条`
        },
        showSizeChanger: true},
    loading: false
  };

  // 组件创建完成后的阶段会调用这个方法
  componentDidMount() {
    const params = {
        pageSize: this.state.pagination.pageSize,
        pageNumber: this.state.pagination.pageSize
    }
    this.fetch(params);
    //提供父组件调用table的getList方法
    this.props.onRef(this)
  }

  // 组件调用前, 此时可以对数据进行操作
  componentWillMount() {
    // 这个条件判断的是,如果父组件设置了控制显示多少条/每页的pageSizeOptions数组,并且自定义了数组, 那么将
    // table组件中的pageSize改为数组第一个, 将table中的多少条/页显示数组改为当前数组.
    if (this.props.pageSizeOptions) {
        const pager = { ...this.state.pagination }
        pager.pageSizeOptions = this.props.pageSizeOptions
        pager.pageSize = parseInt(this.props.pageSizeOptions[0])
        this.setState({
            pagination: pager
        })
    }
  }

  // 提供给父组件进行增删改查操作后,刷新列表的方法
  getList = () => {
    // 这里重新请求当前页的数据.
    const params = {
      pageSize: this.state.pagination.pageSize,
      pageNumber: this.state.pagination.current
    }
    this.fetch(params)
  }

  // Table组件自带方法
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    pager.pageSize = pagination.pageSize
    this.setState({
      pagination: pager,
    });
    this.fetch({
      pageSize: pagination.pageSize,
      pageNumber: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  /**
   *table组件自带的fetch方法, 其中, url, method, data 的值  已经修改为为自定义的动态数据,
   * 为了让table组件可以实现公用.
   * 这几个动态数据都是获取父组件传递过来的requestMsg对象中的属性值.
   *
   * @memberof TableCommon
   */
  fetch = (params = {}) => {
    // 设置loading加载动画
    this.setState({ loading: true });
    Axios({
      url: this.props.requestMsg.url,
      method: this.props.requestMsg.method,
      data: {
        ...params,
        ...this.props.requestMsg.defaultParams
      },
      type: 'json',
    }).then(res => {
      const pagination = { ...this.state.pagination };
      // 这里当请求完成后, 对响应数据格式进行一个处理, 避免因为响应格式的层级嵌套不对,造成无法获取到数据.
      if (res.data.list) {
        const data = res.data
        pagination.total = data.total
        this.setState({
          loading: false,
          data: data.list,
          pagination,
        });
      } else if (res.data.data.list) {
        const data = res.data.data
        pagination.total = data.total
        this.setState({
          loading: false,
          data: data.list,
          pagination,
        })
      }
    }).catch(e => {
      // 当查不到数据的时候, 将分页器总条数置为0
        const pagination = { ...this.state.pagination }
        pagination.total = 0
        this.setState({
            loading: false,
            pagination,
        })
    });
  };

  render() {
    return ( 
      <Table
          className="table-background"
          bordered
          rowClassName={(record, idx) => {
                return 'bg-row'}}
          size="small"
          columns={this.props.columns}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
      />
    );
  }
}

export default withRouter(TableCommon)
