import React, { useEffect, Fragment } from 'react';
import Spinner from '../layouts/Spinner.jsx';
import { Link } from 'react-router-dom';
import ProfileTop from './profileTop.jsx';
import ProfileAbout from './profileAbout.jsx';
import ProfileEducation from './profileEducation.jsx';
import ProfileExperience from './profileExperience.jsx';
import { getProfileById } from '../../Action/profileAction';

//Redux
import { connect } from 'react-redux';

const Profile = ({ profile: { profile, loading }, getProfileById, auth, match }) => {

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id]);

    return (
        <Fragment>
            {
                profile === null || loading ? <Spinner /> :

                    <Fragment>
                        <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
                        {auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id &&
                            (<Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>)}
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div class="profile-exp bg-white p-2">
                            <h2 class="text-primary">Experience</h2>
                            {
                                (profile.experience.length > 0) ? (<Fragment>
                                    {
                                        profile.experience.map(exp => (
                                            <ProfileExperience key={exp._id} experience={exp} />
                                        ))
                                    }
                                </Fragment>) : (<h4>No Experience Credential</h4>)
                            }
                        </div>
                        <div class="profile-edu bg-white p-2">
                            <h2 class="text-primary">Education</h2>
                            {
                                (profile.education.length > 0) ? (<Fragment>
                                    {
                                        profile.education.map(edu => (
                                            <ProfileEducation key={edu._id} education={edu} />
                                        ))
                                    }
                                </Fragment>) : (<h4>No Education Credential</h4>)
                            }
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
        auth: state.loginRegisterState
    }
}

export default connect(mapStateToProps, { getProfileById })(Profile);