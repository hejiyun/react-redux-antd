import React from 'react'
import {withRouter }  from 'react-router-dom'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Row,
    Col,
    Checkbox,
    Button
  } from 'antd';

  const { Option } = Select;
  


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  componentDidMount() {
    console.log(this.props.className)
  }  

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  login = () => {
    // 显示注册组件
    this.props.switchShowBox('login')
    setTimeout(() => this.props.form.resetFields(), 500)
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    return (
      <div className={this.props.className}>
        <h3 style={{color: 'white'}}>新用户注册</h3>
        <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '邮箱格式不正确!',
                },
                {
                  required: true,
                  message: '请输入邮箱!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请确认您的密码!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                昵称&nbsp;
                <Tooltip title="你希望别人怎么称呼你?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="手机">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入您的手机号!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item label="验证码" extra="我们必须确认不是机器人">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '请输入验证码!' }],
                })(<Input />)}
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                我同意 <span>这份协议</span>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
            <Button style={{marginLeft: '10%'}} type="primary" onClick={this.login}>
              返回
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const registerForm = Form.create({ name: 'register' })(RegistrationForm);

export default withRouter(registerForm)