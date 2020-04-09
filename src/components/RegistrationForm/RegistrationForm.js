import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';
import ValidationError from '../ValidationError/ValidationError';
import UserContext from '../contexts/UserContext';
import './RegistrationForm.css';

class RegistrationForm extends Component {
    static contextType = UserContext

    state = { 
        error: null,
        touched: false,
        password: '' 
    }

    firstInput = React.createRef()

    componentDidMount() {
        this.firstInput.current.focus()
    }

    passwordUpdated = (e) => {
        this.setState({
            touched: true,
            password: e
        })
    }

    validatePassword = () => {
        const password = this.state.password;
        const hasNum = /\d/;
        const hasUpperCase = /([A-Z])/;
        const hasSpecialChar = /([!@#$%^&])/;
        console.log(password)
        if (password.length <= 7) {
            return 'Password needs to be at least 8 characters long'
        }
        else if (!hasNum.test(password)) {
            return 'Password must contain a number'
        }
        else if(!hasUpperCase.test(password)) {
            return 'Password must contain an uppercase letter'
        }
        else if(!hasSpecialChar.test(password)) {
            return 'Password must contain a special character'
        }
        return null
    }

    handleRegisterSuccess = () => {
        const {history} = this.props
        history.push('/login')
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/dashboard'
        history.push(destination)
    }

    handleGuestLogin = (e) => {
        e.preventDefault()
        const guestAccount = {
            username: 'admin',
            password: 'admin123!'
        }
        AuthApiService.postLogin(guestAccount)
            .then(res => {
                this.context.processLogin(res.authToken)
                this.handleLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    handleRegistration = (e) => {
        e.preventDefault()
        const {name, username, password} = e.target
        AuthApiService.postUser({
            name: name.value,
            username: username.value,
            password: password.value
        })
        .then(user => {
            name.value = ''
            username.value = ''
            password.value = ''
            this.handleRegisterSuccess()
        })
        .catch(err => {
            this.setState({ error: err.error })
        })
    }

    
    render() {
        const { error, touched } = this.state

        return (<>
            <section id='introduction'>
                <p id='intro-text'>Stuck inside and indecisive?</p>
                <p id='intro-text'>Indecisio helps cure your boredom by suggesting things to do based on your mood and favorite activities.</p>
            </section>
            <section className='form-wrapper'>
                <form id='registration-form' onSubmit={e => this.handleRegistration(e)}>
                    <h2>Register</h2>

                {error && (<ValidationError message={error}/>)}
                {touched && (<ValidationError message={this.validatePassword()}/>)}
                    <label className='form-input-label' htmlFor='name'>Name</label>
                        <input className='registration-form-text-input activity-form-text-input' ref={this.firstInput} name='name' placeholder='Name' type='text' aria-label="name" required/>
                    <label className='form-input-label' htmlFor='username'>Username</label>
                        <input className='registration-form-text-input activity-form-text-input' name='username' placeholder='Username' type='text' aria-label="username" required/>
                    <label className='form-input-label' htmlFor='password'/>
                        <input className='registration-form-text-input activity-form-text-input' onChange={e => this.passwordUpdated(e.currentTarget.value)}aria-label='password' name='password' placeholder='Password' type='password' required/>
                    <button className='button-primary' type='submit'>Submit</button>
                    <button className='button-guest' onClick={e => this.handleGuestLogin(e)}>Login as Guest</button>
                    <Link to='/login' className='register-redirect-link'>
                        Already have an account?
                    </Link>
                </form>
            </section>
            </>
        )
    }
}

export default RegistrationForm