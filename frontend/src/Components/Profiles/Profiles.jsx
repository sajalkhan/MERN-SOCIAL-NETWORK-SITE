import React, { useEffect, Fragment } from 'react';
import Spinner from '../layouts/Spinner.jsx';
import { getProfiles } from '../../Action/profileAction';
import ProfileItem from './ProfileItem.jsx';

//Redux
import { connect } from 'react-redux';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            { profiles === null || loading ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))) : <h4>No profile found</h4>}
                    </div>
                </Fragment>}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer
    }
}

export default connect(mapStateToProps, { getProfiles })(Profiles);