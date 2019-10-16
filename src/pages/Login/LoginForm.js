import React from 'react'
import {withRouter }  from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, Row, Col, } from 'antd';
import './style.css'

class NormalLoginForm  extends React.Component{
    state = {
        focusItem: -1
    }

    componentDidMount(){
    }

    loginSubmit = (e) => {
        // 表单验证,登录逻辑
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.history.push({pathname: '/'})
            console.log('Received values of form: ', values);
          }
        });
    }

    register = () => {
        // 显示注册组件
        this.props.switchShowBox('register')
        setTimeout(() => this.props.form.resetFields(), 500)
    }

    forgot = () => {
       // 显示忘记密码
    }

    render() {
        const { getFieldDecorator } = this.props.form
        console.log(this.props.className)
        return (
           <div className={this.props.className}>
               <h3>管理员登录</h3>
               <Form onSubmit={this.loginSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={8}>
                            <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: 'Please input the captcha you got!' }],
                            })(<Input />)}
                            </Col>
                            <Col span={12}>
                            <Button>Get captcha</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox style={{ color: 'white' }}>Remember me</Checkbox>)}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <span className="register-change-span" onClick={this.register}>register now!</span>
                    </Form.Item>
                </Form>
           </div>
        )
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default withRouter(LoginForm)