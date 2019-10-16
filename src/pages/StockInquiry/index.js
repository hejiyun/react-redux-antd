
import React from 'react'
import BreadcrumbBar from '../../components/Breadcrumb/index'


class StockInquiry extends React.Component{
    render() {
        return (
            <div>
                <BreadcrumbBar arr={['库存查询']}/>
                <div className="boxContainer">
                库存查询
                </div>
            </div>
        )
    }
}
export default StockInquiry