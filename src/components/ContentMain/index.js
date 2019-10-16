import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute'

// 使用react-loadable实现组件按需加载.
const Home = LoadableComponent(()=>import('../../pages/Home/index'))  //参数一定要是函数，否则不会懒加载，只会代码拆分

const orderList = LoadableComponent(()=>import('../../pages/orderList/index'))

const orderDetail = LoadableComponent(()=>import('../../pages/orderList/components/orderDetail/index'))

const DeliverList = LoadableComponent(()=>import('../../pages/DeliverList/index'))

const shopCart = LoadableComponent(()=>import('../../pages/DeliverList/shopCart/index'))

const User = LoadableComponent(()=>import('../../pages/User/index'))

const StockInquiry = LoadableComponent(()=>import('../../pages/StockInquiry/index'))

const NotFound404 = LoadableComponent(()=>import('../../pages/NotFound404/index'))


class ContentMain extends React.Component {
  render () {
    return (
      <div style={{ position: 'relative'}}>
        {/* 路由从上到下依次匹配, 如果将404放在前面,则404后的路由都不会响应 */}
        <Switch>
          <PrivateRoute exact path='/Home' component={Home}/>
          <PrivateRoute exact path='/orderList' component={orderList}/>
          {/* 路由传参与vue方式相同,用params方式传参,优点在于刷新参数依然存在, 获取的时候 使用 this.props.match.params.id获取 */}
          <PrivateRoute exact path='/orderList/orderDetail/:id?' component={orderDetail}/>
          <PrivateRoute exact path='/DeliverList' component={DeliverList}/>
          <PrivateRoute exact path='/DeliverList/shopCart' component={shopCart}/>
          <PrivateRoute exact path='/User' component={User}/>
          <PrivateRoute exact path='/StockInquiry' component={StockInquiry}/>
          <PrivateRoute exact path='/StockInquiry' component={StockInquiry}/>
          <Redirect exact from='/' to='/Home'/>
          <PrivateRoute component={NotFound404}></PrivateRoute>
        </Switch>
      </div>
    )
  }
}

export default withRouter(ContentMain)