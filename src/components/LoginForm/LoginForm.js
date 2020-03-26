import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
//import AuthApiService from '../../services/auth-api-service';

class LoginForm extends Component {
    state = { error: null }

    render() {
        const { error } = this.state
        return (
            <section id='form-wrapper'>
            <form className="login-form activity-form">
                <h2>Login</h2>

                <label className='form-input-label' htmlFor='username'>Username</label>
                    <input className='login-form-username-input activity-form-text-input' name='username' placeholder='Username' type='text' required/>
                <label className='form-input-label' htmlFor='password'>Password</label>
                    <input className='login-form-password-input activity-form-text-input' name='password' placeholder='Password' type='text' required/>
                    {error && (<ValidationError message={error} />)}
                <button className='button-primary' type='submit'>Submit</button>
            </form>
            </section>
        )
    }
}

export default LoginForm