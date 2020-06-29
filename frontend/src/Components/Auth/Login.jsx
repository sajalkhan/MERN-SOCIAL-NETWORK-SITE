import React, { Fragment, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';

//Redux connect
import { connect } from 'react-redux';
import { loginAction } from '../../Action/loginRegisterAction';

const Login = ({loginAction, isAuthenticated}) => {

    const [state, setState] = useState({
        email: '',
        password: ''
    });
    
    const { email, password } = state;
    
    const updateData = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    
    const submitInfo = async (e) => {
    
        e.preventDefault();
        loginAction(email, password);
    }
    
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={e=> submitInfo(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => updateData(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => updateData(e)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.loginRegisterState.isAuthenticated
    }
}

export default connect(mapStateToProps, {loginAction})(Login);