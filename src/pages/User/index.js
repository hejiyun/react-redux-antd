import React from 'react'
import BreadcrumbBar from '../../components/Breadcrumb/index'
import ModelCommon from '../../components/modelCommon/index'
import moment from 'moment'


class User extends React.Component{
 
    submitModel = (values) => {
        console.log(values)
    }
    render() {
        const modelOptions = {
            btnText: '点击弹出框',
            btnType: '',
            modelTitle: '新建窗口',
            okText: '确认',
            cancelText: '取消'
    
        }
             // 搜索框选项参数
             const FormOptions = [
                {
                    label: '订单号',
                    key: 'orderNo',
                    type: 'checkBox',
                    notice: '请输入订单号',
                    placeholder: '请输入订单号',
                    checked: true
                },
                {
                    label: '收件人',
                    key: 'receiver',
                    type: 'NumberInput',
                    notice: '请输入收件人',
                    placeholder: '请输入收件人',
                    max: 100000,
                    step: 0.01
                },
                {
                    label: '地址', // 左侧标题名
                    key: 'address', // 对应需要传出对象的键
                    type: 'select', // 需要渲染的标签名, 默认渲染span
                    notice: '请输入地址', // 进行校验后,提示文字
                    placeholder: '请输入地址', // 默认提示文字
                    rule: true, // 是否进行校验
                    defaultValue: ['all'], // 默认值
                    options: [         // 如果有子数组, 如:select, list等等 , 自动循环
                        {
                            label: '张三',
                            value: 'jack'
                        },
                        {
                            label: '李四',
                            value: 'rose'
                        },
                        {
                            label: '王五',
                            value: 'tom'
                        }
                    ]
                  
                },
                {
                    label: '电话',
                    key: 'phone',
                    type: 'input',
                    notice: '请输入电话',
                    placeholder: '请输入电话',
                },
                {
                    label: '金额',
                    key: 'money',
                    type: 'input',
                    notice: '请输入金额',
                    placeholder: '请输入金额',
                    rule: true
                },
                {
                    label: '排名',
                    key: 'order',
                    type: 'data',
                    notice: '请输入排名',
                    placeholder: '请输入排名',
                    defaultValue: [moment('2015/01/01','YYYY/MM/DD'), moment('2015/01/01', 'YYYY/MM/DD')],
                    dateFormat: 'YYYY/MM/DD'
                },
                {
                    label: '弟弟',
                    key: 'dele'
                },
                {
                    label: '天真',
                    key: 'et',
                    type: 'textarea'
                },
                {
                    label: 'wenjian',
                    key: 'fileList',
                    type: 'Upload',
                    url: '/Upload/to'
                }
            ]
        return (
            <div>
                <BreadcrumbBar arr={['用户']}/>
                <div className="boxContainer">
                    <p className="app-title-more">按钮弹窗类别</p>
                    <ModelCommon FormOptions={FormOptions} modelOptions={modelOptions} submitModel={this.submitModel}/>
                </div>
            </div>
        )
    }
}
export default User