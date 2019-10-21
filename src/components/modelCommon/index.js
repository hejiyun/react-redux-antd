import React from 'react'
import { withRouter } from 'react-router-dom'
import { Modal,Form, Row, Col ,Input, Button, DatePicker, InputNumber, Checkbox, Select, Icon , Radio, Upload } from 'antd';

const { RangePicker } = DatePicker
const { Option } = Select;
const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
      state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
        ],
      }

      handleCancel = () => this.setState({ previewVisible: false });

      handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
      };
    
      handleChange = (fileList ) => {
        this.setState({
          fileList: fileList
        })
        this.props.getFiles(fileList)
      };
    
      // select全选
    onChange = (targe, val, item)=>{
      // 多选下拉实现全选功能
    }
    // handleChange = ({ file, fileList }) => {
    //   // console.log(file, 'qweqw')
    //   // var blob = new Blob([file.thumbUrl], {type: "image/png"}),
    //   //  url = URL.createObjectURL(blob)
    //   // file.thumbUrl = url
    // }
    normFile = e => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
    // 创建表单元素
    getFields() {
      const options = this.props.FormOptions
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < options.length; i++) {
        children.push(
          <Col key={i}>
            {
              options[i].type !== 'Upload' ? <Form.Item label={options[i].label}>
              {getFieldDecorator(options[i].key, {
                initialValue: options[i].defaultValue, // 表单控件的默认值用initialValue定义
                rules: [
                  {
                  required: options[i].rule,
                  message: `${options[i].notice}`,
                  },
              ],
              })(this.getType(options[i]))}
              </Form.Item> : <Form.Item label={options[i].label} extra={options[i].extra || ''}>
                {getFieldDecorator(options[i].key, {
                  valuePropName: 'filelist',
                  getValueFromEvent: this.normFile,
                  rules: [
                    {
                    required: options[i].rule,
                    message: `${options[i].notice}`,
                    },
                ],
                })(this.getType(options[i]))}
            </Form.Item>
            }
          </Col>
        );
        }
        return children;
    }

    // 通过循环的每一项的type属性判断,对应的form表单项.
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
          return <Select mode="multiple" onChange={this.onChange.bind(this, item)} menuItemSelectedIcon={<Icon/>} maxTagCount={1} maxTagPlaceholder={`+1`} style={{ width: '100%' }}>
                  <Option key='all'>全部</Option>
                  {
                    item.options.map(e => {
                      return <Option key={e.value}>{e.label}</Option>
                    })
                  }
                </Select>
        case 'textarea': 
          return <TextArea rows={4} />
        case 'radio':
          return <Radio.Group>
                  {
                    item.options.map(e => {
                      return  <Radio value={item.value}>{item.label}</Radio>
                    })
                  }
                  </Radio.Group>
        case 'Upload':
          return  <div>
                    <Upload name="logo" action={item.url} listType="picture" onPreview={this.handlePreview} onChange={this.handleChange}>
                      <Button>
                        <Icon type="upload" /> {item.btnText || '点击上传'}
                      </Button>
                    </Upload>
                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                    </Modal>
                  </div>
        default:
          return <span>{item.key}</span>

      }
      
    }


      render() {
        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };
        const { visible, onCancel, onCreate } = this.props;
        return (
          <Modal
            visible={visible}
            title={this.props.modelOptions.modelTitle}
            okText={this.props.modelOptions.okText || '确认'}
            cancelText={this.props.modelOptions.cancelText || '取消'}
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form {...formItemLayout} layout="vertical">
              <Row gutter={24}>{this.getFields()}</Row>
            </Form> 
          </Modal>
        );
      }
    },
  );
  
  class ModelCommon extends React.Component {
    state = {
      visible: false,
      fileList: []
    };
  
    showModal = () => {
      this.setState({ visible: true });
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };

    getFiles = (fileList) => {
      this.setState({
        fileList: fileList
      })
    }
  
    handleCreate = () => {
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        values['fileList'] = this.state.fileList.fileList
        this.props.submitModel(values)
        form.resetFields();
        this.setState({ visible: false })
      });
    };
  
    saveFormRef = formRef => {
      this.formRef = formRef;
    };
  
    render() {
      return (
        <div>
          <Button type={this.props.modelOptions.btnType || 'primary'} onClick={this.showModal}>
            {this.props.modelOptions.btnText}
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            modelOptions={this.props.modelOptions}
            FormOptions={this.props.FormOptions}
            getFiles={this.getFiles}
          />
        </div>
      );
    }
  }
export default withRouter(ModelCommon)