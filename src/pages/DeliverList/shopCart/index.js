import React, { Component } from 'react';
import BreadcrumbBar from '../../../components/Breadcrumb/index'
import { connect } from 'react-redux';
import CardCommon from '../../../components/CardCommon/index'
import { Card, Button, Modal } from 'antd';
import tvImg from '../../../images/tv.jpg'
// 对数据进行深层判断是否改变
import { is, fromJS } from 'immutable';
// prop-types用于设定数据类型,防止产生不必要的误差,如果已有数据类型与设定数据类型不一致,则会提示报错.
import PropTypes from 'prop-types';
// 导入数据操作方法
import { getProData, togSelectPro, editPro, delPro } from '../../../redux/Collecte/action'

class shopCart extends Component {
    static propTypes = {
        // 设定proData必须是object集合类型
        proData: PropTypes.object.isRequired,
        // 设定以下三个属性值必须是函数类型.
        getProData: PropTypes.func.isRequired,
        togSelectPro: PropTypes.func.isRequired,
        editPro: PropTypes.func.isRequired,
        delPro: PropTypes.func.isRequired
   }
    
   state = {
    products: []
   }
   
     // 判断数据是否改变, 如果相同返回false, 提升性能优化.
     shouldComponentUpdate (nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    componentDidMount () {
        if (!this.props.proData.dataList.length) {
           let a =  this.props.getProData()
            console.log(a)
        }
        if (this.props.proData.prod.length !== 0) {
            this.setState({
                products: this.props.proData.prod
            })
        }
    }

    // 点击tab分类顶部的分类触发的getMore事件
    getMore = () => {
        console.log('获取更多')
        this.info()
    }

    // 点击更多打开的弹窗
    info = () => {
        Modal.info({
          title: '没有更多了,敬请期待',
          content: (
            <div>
              <p>试试自己添加几个分类哟</p>
            </div>
          ),
          onOk() {},
        });
    }

    // 点击立即购买按钮, 打开弹窗
    delfromshopCard = (index, item) => {
       this.props.delPro(index, item)
       //delPro执行后,需要异步才能获取到更新后的this.props.proData.prod的值
       setTimeout(() => {
           this.setState({
               products: this.props.proData.prod
           })
       }, 100)
    }


    render () {
        const { products } = this.state
         // 卡片tab标签, key控制对应的内容显示属性, tab属性控制tab标签的显示文字
         const tabListNoTitle = [
            {
              key: 'move',
              tab: '电视机',
            },
            {
              key: 'car',
              tab: '汽车',
            },
            {
              key: 'clothes',
              tab: '服饰',
            },
          ];
            // 控制CardTab的每一项的内容
            const contentListNoTitle = {
                move: <div>
                       <div className={products.length === 0 ? 'isShow' : 'isHidden'}>暂无数据</div>
                      {
                        products.map((item, index) => {
                            return <Card.Grid style={gridStyle} key={index}>
                                <img src={tvImg} alt="加载失败" width="100%"></img>
                                <p style={{textAlign: 'right', padding: '0 20px'}}><span style={{float: 'left', fontSize: '18px'}}>{item.name}</span><span style={{color: 'red', fontSize: '20px'}}>¥{item.price}</span></p>
                                <p style={{textAlign: 'left', padding: '0 20px'}}><Button type="danger" onClick={this.delfromshopCard.bind(this, index, item)}>删除</Button><span style={{float: 'right', fontSize: '18px'}}>{'数量: '+ item.count}</span></p>
                            </Card.Grid>
                        })
                    }
                </div>,
                car: <div>
                       {
                        this.props.proData.dataList.map((item, index) => {
                            return <div className="pro-item-edit" key={index}>
                                    <span className="pro-num"> 当前数字为: {item.selectNum} </span>
                                   </div>
                        })
                      }
                    </div>,
                clothes: <p>我的超级英雄学院</p>,
              };
        return (
            <div>
                <BreadcrumbBar arr={[{title: '购物车列表', to: '/DeliverList'}, '购物车']}/>
                <div className="boxContainer">
                <p className="app-title-more">购物车</p>
                <CardCommon contentListNoTitle={contentListNoTitle} tabListNoTitle={tabListNoTitle} getMore={this.getMore}></CardCommon>
                </div>
            </div>
        )
    }
}

const gridStyle = {
    width: '25%',
    textAlign: 'center',
}

export default connect(state => (
    {proData: state.proData}
), {
    getProData,
    togSelectPro,
    editPro,
    delPro
})(shopCart)
