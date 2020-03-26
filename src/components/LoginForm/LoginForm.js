import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import UserContext from '../contexts/UserContext'
import AuthApiService from '../services/auth-api-service';

class LoginForm extends Component {
    static contextType = UserContext

    state = { error: null }

    firstInput = React.createRef()

    componentDidMount() {
        this.firstInput.current.focus()
    }

    handleLogin = (e) => {
        e.preventDefault()
        const {username, password} = e.target
        
    }

    render() {
        const { error } = this.state
        return (
            <section id='form-wrapper'>
            <form className="login-form activity-form" onSubmit={e => this.handleLogin(e)}>
                <h2>Login</h2>

                <label className='form-input-label' htmlFor='username'>Username</label>
                    <input className='login-form-username-input activity-form-text-input' ref={this.firstInput} name='username' placeholder='Username' type='text' required/>
                <label className='form-input-label' htmlFor='password'>Password</label>
                    <input className='login-form-password-input activity-form-text-input' name='password' placeholder='Password' type='password' required/>
                    {error && (<ValidationError message={error} />)}
                <button className='button-primary' type='submit'>Submit</button>
                <Link to='/' className='login-redirect-link'>
                    Don't have an account with us?
                </Link>
            </form>
            </section>
        )
    }
}

export default LoginForm