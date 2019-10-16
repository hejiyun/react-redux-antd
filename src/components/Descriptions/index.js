import React from 'react'
import { Descriptions } from 'antd';

const DescriptionsCommon = (props) => (
    <Descriptions
    title={props.title}
    size="small"
    bordered
    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
  >
    {props.ObjectView && props.DpOptions && props.DpOptions.map(item=>{
        return <Descriptions.Item key={item.name} label={item.name} span={item.span || 1}>{props.ObjectView[item.key]}</Descriptions.Item>
    })}
  </Descriptions>

)

export default DescriptionsCommon