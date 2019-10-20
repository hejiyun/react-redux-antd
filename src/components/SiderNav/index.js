import React from 'react'
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom'

// @withRouter // 使不通过页面跳转的组件可以访问this.props
class SiderNav extends React.Component {
  state = {
    collapsed: false,
    selectedKeys: ['/Home']
  };

  // 点击menu触发菜单栏高亮切换
  handleClick = e => {
    const screenWidth = document.body.clientWidth
    if (screenWidth < 992) {
      this.props.onToggle()
    }
    this.setState({
      selectedKeys: [e.key],
    });
  };

  // 初始化不执行, 在component接收新的状态(prop)时被触发, 一般用于父组件状态更新时子组件的重新渲染
  componentWillReceiveProps(nextProps) {
    //当点击面包屑导航时，侧边栏要同步响应, 不通过菜单栏跳转的,一般都可以在这里获取.
    const pathname = nextProps.location.pathname
    // 先判断当前地址如果不是上一个地址
    if (this.props.location.pathname !== pathname ) {
      // 再判断当前跳转的地址内有没有包含上一个地址, 如果包含, 那么就是跳转进附属页面了, 此时菜单栏应该不变
      if (pathname.indexOf(this.props.location.pathname) !== -1) {
        // 如果是'/'的话.表明访问首页, 也不作处理,直接让它跳转
        if (this.props.location.pathname === '/') {
          this.setState({
            selectedKeys: [pathname],
          })
        }
          
      } else {
        // 如果不包含,证明跳转的不是有个类别, 所以将菜单栏置为新的高亮状态.
        this.setState({
          selectedKeys: [pathname],
        })
      }
    }
  }
  
  componentDidMount() {
    // 每次加载main部分组件时,抓取当前页面跳转地址, 将当前地址设置为menu高亮.
    const pathName = this.props.location.pathname
    const arr = pathName.split('/')
    switch (arr.length) {
      // 如果当前地址截取长度为2,那么证明是只有一个/,即是主菜单的其中一个,此时直接填入高亮
      case 2 :
        this.setState({
          selectedKeys: [pathName]
        })
        break;
      // 如果当前地址截取的长度为3,那么证明是子菜单的一个,此时,填入的应该是主菜单的高亮部分
      case 3 :
        this.setState({
          selectedKeys: [`/${arr[1]}`]
        })
        break;
      // 就当前项目而言,结构较简单, 如果层级复杂, 可以继续判断长度.
      default :
        this.setState({
          selectedKeys: [`/${arr[1]}`]
        })
    }
  }
  render() {
    const { selectedKeys, collapsed } = this.state
    return (
      <div>
        <Menu
          style={{ marginTop: '60px'}}
          onClick={this.handleClick}
          defaultSelectedKeys={selectedKeys}
          mode="inline"
          theme="dark"
          selectedKeys={selectedKeys}
          inlineCollapsed={collapsed}
        >
          {/* key值绑定当前页面跳转pathName, 就可以通过地址栏输入,直接对应菜单栏高亮 */}
          {
            this.props.siderOptions.map(item => {
              return  <Menu.Item key={item.to}>
                        <Link to = { item.to }>
                          <Icon type={item.icon} />
                          <span>{item.name}</span>
                        </Link>
                      </Menu.Item>
            })
          }
        </Menu>
      </div>
    );
  }
}

export default withRouter(SiderNav)