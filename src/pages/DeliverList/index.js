import React from 'react'
import BreadcrumbBar from '../../components/Breadcrumb/index'
import CardCommon from '../../components/CardCommon/index'
import { Button, Modal, Card, Row, Col  } from 'antd'
import { connect } from 'react-redux';
import tvImg from '../../images/tv.jpg'
// 对数据进行深层判断是否改变
import { is, fromJS } from 'immutable';
// prop-types用于设定数据类型,防止产生不必要的误差,如果已有数据类型与设定数据类型不一致,则会提示报错.
import PropTypes from 'prop-types';
// 导入数据操作方法
import { getProData, togSelectPro, editPro, addPro } from '../../redux/Collecte/action'

import api from '../../axios/api'


class DeliverList extends React.Component{
    static propTypes = {
        // 设定proData必须是object集合类型
        proData: PropTypes.object.isRequired,
        // 设定以下三个属性值必须是函数类型.
        getProData: PropTypes.func.isRequired,
        togSelectPro: PropTypes.func.isRequired,
        editPro: PropTypes.func.isRequired,
        addPro: PropTypes.func.isRequired
    }
    state = {
        products: [],
        visible: false,
        currentProduct: {}
    }

    shouldComponentUpdate (nextProps, nextState) {
        return !is(fromJS ( this.props), fromJS (nextProps)) || !is(fromJS (this.state), fromJS (nextState))
    }
    
    async componentDidMount () {
        if (!this.props.proData.dataList.length) {
           this.props.getProData();
        }
        const res = await api.getPro()
        this.setState({
            products: res.data
        })
    }

    // 点击增加数量的方法
    handleEdit = (index, num, name) => {
        let currentNum = this.props.proData.dataList[index].selectNum + num;
        if (currentNum < 0 ) {
            return
        }
        this.props.editPro (index, currentNum, name);
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
    addToshopCard = (item, index) => {
        if (this.state.currentProduct.name === item.name) {
            this.setState({
                visible: true
            })
        } else {
            const it = item
            it['count'] = 1
            it['index'] = index
            this.setState({
                visible: true,
                currentProduct: it
            })
        }
    }

    // 点击添加弹窗的确认
    handleOk = (e) => {
        // 这里需要转换一下, 不然下面的 将count变为1的操作会影响到store中存储的count
        const a = {...e}
        a.price = a.count * a.price
        this.props.addPro(e.index, a)
        e.count = 1
        this.setState({
          visible: false,
          currentProduct: e
        });
    };
    
      // 点击添加弹窗的取消
    handleCancel = e => {
        this.setState({
          visible: false,
        });
    };

    // 点击减号减少数量
    ProductCountCut = () => {
        // 这里取浅拷贝一个对象,  针对数组,集合这种复杂数据类型, 动态绑定{}并不会及时更新,它会认为外部无变化, 
        // 此时应拷贝一个对象,就可以解决数据改变, 视图无变化的问题.
        const its = {...this.state.currentProduct}
        its.count--
        if (its.count <= 0)  return
        this.setState({
            currentProduct: its
        })

    }


    // 点击加号增加数量
    ProductCountAdd = () => {
        const its = {...this.state.currentProduct}
        its.count++
        if (its.count >= 6) {
          return
        } 
        this.setState({
            currentProduct: its
        })
    }


    // 点击tab分类顶部的分类触发的getMore事件
    getMore = () => {
        console.log('获取更多')
        this.info()
    }

    // 点击购物车按钮跳转到购物车页面
    goToShopCart = () => {
        this.props.history.push('/DeliverList/shopCart')
    }

    render() {
        const { products, currentProduct } = this.state
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
                  {
                    products.map((item, index) => {
                        return <Card.Grid style={gridStyle} key={index}>
                            <img src={tvImg} alt="加载失败" width="100%"></img>     
                            <p style={{textAlign: 'right', padding: '0 20px'}}><span style={{float: 'left', fontSize: '18px'}}>{item.name}</span><span style={{color: 'red', fontSize: '20px'}}>¥{item.price}</span></p>
                            <p style={{textAlign: 'right', padding: '0 20px'}}><span style={{float: 'left', fontSize: '18px'}}>{item.description}</span><Button type="danger" onClick={this.addToshopCard.bind(this, item, index)}>立即购买</Button></p>
                        </Card.Grid>
                    })
                }
            </div>,
            car: <div>
                   {
                    this.props.proData.dataList.map((item, index) => {
                        return <div className="pro-item-edit" key={index}>
                                <span onClick={this.handleEdit.bind(this, index, -1, `${item.name + index}`)}> - </span>
                                <span className="pro-num"> 当前数字为: {item.selectNum} </span>
                                <span onClick={this.handleEdit.bind(this, index, 1,  `${item.name + index}`)}> + </span>
                               </div>
                    })
                  }
                这个是真的火影
                </div>,
            clothes: <p>我的超级英雄学院</p>,
          };
        return (
            <div>
                <BreadcrumbBar arr={['购物车列表']}/>
                <div className="boxContainer">
                   <p className="app-title-more">redux管理类别<Button style={{ marginLeft: '45%'}} type="primary" onClick={this.goToShopCart}>购物车</Button></p>
                   <CardCommon contentListNoTitle={contentListNoTitle} tabListNoTitle={tabListNoTitle} getMore={this.getMore}></CardCommon>
                </div>
                <Modal
                    title="添加商品"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                          关闭
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk.bind(this, currentProduct)}>
                          添加
                        </Button>,
                      ]}
                    >
                    <img src={tvImg} alt="加载失败" width="100%"></img>
                    <p style={{textAlign: 'right'}}><span style={{float: 'left', fontSize: '18px', fontWeight: '1000'}}>{currentProduct.name}</span><span style={{color: 'red', fontSize: '20px'}}>¥{currentProduct.price * currentProduct.count}</span></p>
                    <Row>
                        <Col span={12} style={{textAlign: 'left', fontSize: '20px', color: '#666',}}>
                        {currentProduct.description}
                        </Col>
                        <Col span={12} style={{textAlign: 'right'}}>
                            <Button disabled={currentProduct.count === 1} onClick={this.ProductCountCut}>-</Button>
                            <span style={{margin: '0 15px'}}>{currentProduct.count}</span>
                            <Button disabled={currentProduct.count === 5} onClick={this.ProductCountAdd}>+</Button>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

// 建立连接,声明数据信息及操作方法. 以及自调用对象(当前需要与数据源建立连接的类对象), 需要用到的action方法都要填上,否则不能进行存储
// 如果 当前的this.props中没有其中一个方法, 大概是下面没有引入方法
export default connect (state => (
    { proData: state.proData }
), {
    getProData,
    togSelectPro,
    editPro,
    addPro
})(DeliverList)

