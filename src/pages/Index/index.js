import React from 'react'
import SiderNav from '../../components/SiderNav'
import { Layout } from 'antd';
import ContentMain from '../../components/ContentMain'
import HeaderBar from '../../components/HeaderBar'

const { Header, Content, Footer, Sider } = Layout;




class Index extends React.Component{
    state = {
      collapsed: false,
      screenWidth: ''
    }
  

    componentWillMount() {
      this.setState({
        screenWidth: document.body.clientWidth
      })
      window.onresize = () => {
        this.setState({
          screenWidth: document.body.clientWidth
        })
        if ((document.body.clientWidth >= 992 && document.body.clientWidth < 1200) && !this.state.collapsed) {
          this.toggle()
        } else if (document.body.clientWidth >= 1200 && this.state.collapsed) {
          this.toggle()
        }
      }
    }
    onCollapse = collapsed => {
      this.setState({ collapsed });
    };

    toggle = () => {
      // console.log(this)  状态提升后，到底是谁调用的它
      this.setState({
        collapsed: !this.state.collapsed
      })
    }
    
    render() {
      const { screenWidth, collapsed } = this.state
    
      // 设置Sider的minHeight可以使左右自适应对齐
      const positionStyle = {
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: '999',
        height: '100%'
      }
      const positionStylediv = { 
         position: 'absolute', 
         top: '0', 
         left: '0', 
         height: '100%', 
         width: '100vw',
         background: '#000',
         opacity: '.3'
      }
      // 侧边菜单栏选项
      const siderOptions = [
        {
          to: '/Home',
          name: '首页',
          icon: 'pie-chart'
        },
        {
          to: '/orderList',
          name: '订单列表',
          icon: 'desktop'
        },
        {
          to: '/DeliverList',
          name: '购物车列表',
          icon: 'inbox'
        },
        {
          to: '/User',
          name: '用户',
          icon: 'mail'
        },
        {
          to: '/StockInquiry',
          name: '库存查询',
          icon: 'inbox'
        }
      ]
      return (
        <div id='page' style={{ height: '100%' }}>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider breakpoint="lg"
              collapsedWidth={ screenWidth >= 992 ? '80' : '0' }
              trigger={null} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
              style={screenWidth < 992 ? positionStyle : ''}>
              <div className={(screenWidth< 992 && !collapsed) ? 'isShow' : 'isHidden'} style={screenWidth <= 992 ? positionStylediv : {display: 'none'}} onClick={this.toggle}></div>
              <SiderNav siderOptions={siderOptions} onToggle={this.toggle}/>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle}/>
              </Header>
              <Content style={{ overflow: 'initial', flex: '1 1 0' }}>
                  <ContentMain/>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        </div>
      );
    }
  }
  export default Index