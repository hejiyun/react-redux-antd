import React from 'react'
import BreadcrumbBar from '../../components/Breadcrumb/index'

class User extends React.Component{


    render() {
      
        return (
            <div>
                <BreadcrumbBar arr={['用户']}/>
                <div className="boxContainer">
                   用户设置
                </div>
            </div>
        )
    }
}
export default User