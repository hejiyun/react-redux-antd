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
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 6; i++) {
        children.push(
            <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <Form.Item label={`Field ${i}`}>
                {getFieldDecorator(`field-${i}`, {
                rules: [
                    {
                    required: true,
                    message: 'Input something!',
                    },
                ],
                })(<Input placeholder="placeholder" />)}
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
        const params = this.props.ExportOptions
        console.log('导出', params)
        Axios({
            method: params.method,
            url: params.url,
            data: params.data,
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