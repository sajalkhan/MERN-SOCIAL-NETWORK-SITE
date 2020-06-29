import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

//Redux connect
import { connect } from 'react-redux';
import { setAlert } from '../../Action/alertAction';
import { registerAction } from '../../Action/loginRegisterAction';
// import PropTypes from 'prop-types';

const Register = ({ setAlert, registerAction, isAuthenticated }) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = state;

    const updateData = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const submitInfo = async (e) => {

        e.preventDefault();
        if (password !== password2) {
            setAlert('password do not match', 'danger');
        } else {
            registerAction({ name, email, password });
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => submitInfo(e)}>
                <div className="form-group">
                    <input type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={e => updateData(e)}
                        required />
                </div>
                <div className="form-group">
                    <input type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => updateData(e)} required />
                    <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e => updateData(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={password2}
                        onChange={e => updateData(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1"> Already have an account? <Link to="/login" >Sign In</Link> </p>
        </Fragment>
    )
}

// Register.propTypes = {
//     setAlert: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.loginRegisterState.isAuthenticated
    }
}

export default connect(mapStateToProps, { setAlert, registerAction })(Register);