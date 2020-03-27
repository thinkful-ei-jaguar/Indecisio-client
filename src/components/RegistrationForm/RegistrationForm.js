import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';
import ValidationError from '../ValidationError/ValidationError';
import './RegistrationForm.css'

class RegistrationForm extends Component {
    state = { error: null }

    firstInput = React.createRef()

    componentDidMount() {
        this.firstInput.current.focus()
    }

    handleRegisterSuccess = () => {
        const {history} = this.props
        history.push('/login')
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
        const { error } = this.state

        return (<>
            <section id='introduction'>
                <p>Stuck inside and indecisive?</p> 
                <p>Indecisio helps cure your boredom by suggesting things to do based on your mood and favorite activities.</p>
            </section>
            <section id='form-wrapper'>
                <form className='registration-form activity-form' onSubmit={e => this.handleRegistration(e)}>
                    <h2>Register</h2>
                {error && (<ValidationError message={error}/>)}
                    <label className='form-input-label' htmlFor='name'>Name</label>
                        <input className='registration-form-text-input activity-form-text-input' ref={this.firstInput} name='name' placeholder='Name' type='text' required/>
                    <label className='form-input-label' htmlFor='username'>Username</label>
                        <input className='registration-form-text-input activity-form-text-input' name='username' placeholder='Username' type='text' required/>
                    <label className='form-input-label' htmlFor='password'/>
                        <input className='registration-form-text-input activity-form-text-input' name='password' placeholder='Password' type='password' required/>
                    <button className='button-primary' type='submit'>Submit</button>
                    <button className='button-primary' onClick={this.handleGuestLogin}>Login as Guest</button>
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