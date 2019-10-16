import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import {Link} from 'react-router-dom'



const BreadcrumbBar = (props) => (
    <Breadcrumb style={{ border: '1px solid #ccc', paddingLeft: '16px', height: '40px', lineHeight: '35px', fontSize: '15px', backgroundColor: '#fff', boxShadow: '0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04)'}}>
        <Breadcrumb.Item>
            <Link to='/Home'>
                <Icon type="home"/>
                <span>首页</span>
            </Link>
        </Breadcrumb.Item>
        {/* 如果父组件传递了arr数组, 那么表示面包屑有下一层级, 且如果当前项是集合, 那么表示可以跳转, 如果没有代表当前面包屑 */}
        {props.arr && props.arr.map(item=>{
            if ((typeof item) === 'object'){
                return <Breadcrumb.Item key={item.title}><Link to={item.to}>{item.title}</Link></Breadcrumb.Item>
            } else {
                return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            }
        })}
    </Breadcrumb>

)

export default BreadcrumbBar

 