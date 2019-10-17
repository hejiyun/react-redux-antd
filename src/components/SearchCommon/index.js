import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Row, Col, Input, Button, notification  } from 'antd';
import './index.css'
import Axios from 'axios';


class SearchBar extends React.Component{
    state = {
        expand: false,
      };

    // 创建表单元素
    getFields() {
      const options = this.props.searchOptions
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < options.length; i++) {
        children.push(
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={i}>
            <Form.Item  label={options[i].label}>
                {getFieldDecorator(options[i].label, {
                rules: [
                    {
                    required: true,
                    message: `${options[i].notice}`,
                    },
                ],
                })(<Input placeholder={options[i].placeholder} />)}
            </Form.Item>
            </Col>,
        );
        }
        return children;
    }

  
    // 点击搜索按钮触发事件 
    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err) return
            // 将搜索的参数传递给父组件
            this.props.getSearchParams(values)
        });
    };

    handleReset = () => {
        // 重置选项
        this.props.form.resetFields();
    };
    
    // 点击导出按钮触发事件
    handleExport = () => {
      // 获取此时的搜索栏表单的导出参数
      const formParams = this.props.form.getFieldsValue()
      for(const k in formParams) {
        if (!formParams[k]){
          delete formParams[k]
        }
      }
      // 获取从父组件传来的导出请求参数集合,
      const params = this.props.ExportOptions
      // 合并请求参数集合与搜索栏参数,得到发送请求时的真实参数
      console.log('导出参数:', {...params.data, ...formParams})
      Axios({
          method: params.method,
          url: params.url,
          data: {...params.data, ...formParams},
          responseType: 'blob'  // 如果返回结果出现[object Blob] ,那么把当前行注释掉即可
        }).then(res => {
          if (res.data.code) {
              notification.open({
                  message: '错误',
                  description:
                    '真的有错误.',
              });
            return
          }
          const blob = new Blob(['\ufeff' + res.data], { type: 'text/csv;charset=utf-8' })
          const url = window.URL.createObjectURL(blob)
          // 通过创建a标签实现
          const link = document.createElement('a')
          link.href = url
          // 对下载的文件命名
          link.download = '导出数据表.csv'
          // 下面这段根据实际情况从响应头中content-disposition属性截取出导出文件名.
          // link.download = decodeURI(res.headers['content-disposition'].split('=')[1]) || '导出数据表.csv'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })

    }
 
    componentDidMount() {
        this.props.onRef('searchCommon', this)
    }

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
            <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleExport}>
              导出
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const SearchCommon = Form.create({ name: 'advanced_search' })(SearchBar);

export default withRouter(SearchCommon)