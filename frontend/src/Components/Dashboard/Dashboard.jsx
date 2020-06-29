import React, { useEffect, Fragment } from 'react';
import { getCurrentProfile, deleteAccount } from '../../Action/profileAction';
import DashboardActions from '../Dashboard/DashboardAction.jsx';
import Experience from '../Profile-forms/Experience.jsx';
import Education from '../Profile-forms/Education.jsx';
import Spinner from '../layouts/Spinner.jsx';

//Redux
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = ({ profile: { profile, loading }, auth: { user }, getCurrentProfile, deleteAccount }) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (

        loading && profile == null ? <Spinner /> :
            <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Welcome {user && user.name}
                </p>
                {profile !== null ?
                    <Fragment>
                        <DashboardActions />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />

                        <div class="my-2">
                            <button className="btn btn-danger" onClick={()=>deleteAccount()}>
                                <i className="fas fa-trash-alt"></i>  Delete My Account
                            </button>
                        </div>

                    </Fragment> :
                    <Fragment>
                        <p>You have not yet create a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
                    </Fragment>}
            </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.loginRegisterState,
        profile: state.profileReducer
    }
}
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);