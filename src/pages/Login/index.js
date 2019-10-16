import React from 'react'
import { withRouter } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import './style.css'



class Login extends React.Component{
    state = {
        showBox: 'login',
        url: '',
        loading: false,
        loading1: false
    }

    componentDidMount() {
        //
    }

    switchShowBox = (Box) => {
        this.setState({
            showBox: Box
        })
    }

    render() {
        const {showBox} = this.state
        return (
            <div id='login-page'>
                <div className='container'>
                    <LoginForm
                    className={showBox === 'login' ? 'box showBox' : 'box hiddenBox'}
                    switchShowBox={this.switchShowBox}/>
                    <RegisterForm
                    className={showBox === 'register' ? 'box showBox' : 'box hiddenBox'}
                    switchShowBox={this.switchShowBox}/>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)