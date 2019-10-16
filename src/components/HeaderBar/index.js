import React from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Avatar, Popover, Icon, Badge } from 'antd';


class HeaderBar extends React.Component {

  toggleIcon = () => {
    this.props.onToggle()
    console.log('控制菜单栏伸缩')
  }

  viewUserInfo = () => {
    console.log('查看用户信息')
  }

  viewMessage = () => {
    console.log('查看邮件信息')
  }

  logout = () => {
    console.log('用户退出登录')
  }

  render () {
    const { collapsed } = this.props
    const content = (
      <div>
        <p style={{ cursor: 'pointer' }} onClick={this.viewUserInfo}>
          <Icon type="user"/>
          <span style={{marginLeft: '15%'}}>个人信息</span>
        </p>
        <p style={{ cursor: 'pointer' }} onClick={this.logout}>
          <Icon type="export"/>
          <span style={{marginLeft: '15%'}}>退出登录</span>
        </p>
      </div>
    );
    return (
      <div>
          <Row>
            <Col span={12} style={{ textAlign: 'left', paddingLeft: '20px' }}>
              
              <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={ this.toggleIcon } /> 
            </Col>
            <Col span={12} style={{ textAlign: 'right', paddingRight: '20px' }}>
              <span style={{marginRight: '30px', cursor: 'pointer', userSelect: 'none'}} onClick={ this.viewMessage }>
                <Badge count={100}>
                  <Avatar style={{ backgroundColor: '#fff', color: 'black' }} shape="square" icon="mail" />
                </Badge>
              </span>
              <Popover placement="bottomRight" content={content} title="欢迎您, admin">
                <Avatar style={{ display: 'inline-block', width: '40px', height: '40px', userSelect: 'none' }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
              </Popover>    
            </Col>
          </Row>
      </div>
    )
  }
}

export default withRouter(HeaderBar)