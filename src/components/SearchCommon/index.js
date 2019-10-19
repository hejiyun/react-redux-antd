import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Row, Col, Input, Button, notification, DatePicker, InputNumber, Checkbox, Select, Icon } from 'antd';
import './index.css'
import Axios from 'axios';


const { RangePicker } = DatePicker
const { Option } = Select;

class SearchBar extends React.Component{
    state = {
        expand: false,
        clientWidth: '',
        arr: []
      };

    // select全选
    onChange = (length, key, item)=>{
      console.log(length)
      console.log(key)
      if(key.includes('all')){
          if(length === this.state.arr.length){
              this.setState({
                arr: []
              })
          }else{
              // let keyArr = this.props.children.map(x=>{
              //     return x.key
              // })
              // this.props.onChange(keyArr)
              this.setState({
                arr: key
              })
          }
      }else{
        this.setState({
          arr: key
        })
      }
    }


    // 创建表单元素
    getFields() {
      const options = this.props.searchOptions
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < options.length; i++) {
        children.push(
            <Col  xs={24} sm={12} md={8} lg={6} xl={6} key={i}>
            <Form.Item className={(this.state.clientWidth > 991 || this.state.clientWidth <= 767) ? '' : 'sadasd' } label={options[i].label}>
                {getFieldDecorator(options[i].key, {
                  initialValue: options[i].defaultValue, // 表单控件的默认值用initialValue定义
                  rules: [
                    {
                    required: options[i].rule,
                    message: `${options[i].notice}`,
                    },
                ],
                })(this.getType(options[i]))}
            </Form.Item>
            </Col>,
        );
        }
        return children;
    }

    getType = (item) => {
      switch(item.type) {
        case 'input':
          return <Input style={{width: '100%'}} placeholder={item.placeholder} />
        case 'data':
          return <RangePicker style={{width: '100%'}} format={item.dateFormat}/>
        case 'NumberInput': 
          return <InputNumber style={{width: '100%'}} min={0} max={item.max} step={item.step} />
        case 'checkBox':
          return <Checkbox checked={item.checked} style={{width: '100%'}}>{item.placeholder}</Checkbox>
        case 'select':
          return <Select setFieldsValue={this.state.arr} mode="multiple" onChange={this.onChange.bind(this, item.options.length)} menuItemSelectedIcon={<Icon/>} maxTagCount={1} maxTagPlaceholder={`+1`} style={{ width: '100%' }}>
                  <Option key='all'>全部</Option>
                  {
                    item.options.map(e => {
                      return <Option key={e.value}>{e.label}</Option>
                    })
                  }
                </Select>
        default:
          return <Input style={{width: '100%'}} placeholder={item.placeholder} />

      }
      
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
      this.setState({
        clientWidth: document.body.clientWidth
      })
      this.props.onRef('searchCommon', this)
    }
    componentWillReceiveProps(nextProps) {
      // 只要组件产生变化,就会触发, 无论何种状态, 视口的改变, 数据的变化, 等等, 类似监听器.
      this.setState({
        clientWidth: document.body.clientWidth
      })
    }

  render() {
    return (
      <Form className="ant-advanced-search-form reflax" onSubmit={this.handleSearch}>
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