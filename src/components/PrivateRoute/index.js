import React from 'react'
import { Route, Redirect, } from 'react-router-dom'

// 这里后期可以获取store中的数据.判断权限,如果没有权限,则会重定向到登录页
const isAuthenticated = () => {
    return true
}
// 创建受保护的路由,只有登录状态能访问.
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    !!isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: {from: props.location}
      }}/>
  )}/>
)

export default PrivateRoute