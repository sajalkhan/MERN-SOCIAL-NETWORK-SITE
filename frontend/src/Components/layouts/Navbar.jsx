import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../Action/loginRegisterAction';

const Navbar = ({ logOut, auth: { isAuthenticated, loading } }) => {

    const guestUserLink = (
        <ul>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    const registeredUserLink = (
        <ul>
            <li>
                <Link to="/profiles">
                    Developers
                </Link>
            </li>

            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user"></i>{' '}
                    <span className="hide sm">Dashboard</span>
                </Link>
            </li>

            <li>
                <a onClick={logOut} href="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide sm">Logout</span>
                </a>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? registeredUserLink : guestUserLink}</Fragment>)}
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.loginRegisterState
    }
}

export default connect(mapStateToProps, { logOut })(Navbar);