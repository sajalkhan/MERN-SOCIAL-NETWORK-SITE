import React, { Fragment } from 'react'

const profileAbout = ({ profile: {
    bio,
    skills,
    user: { name }
} }) => {
    return (
        <div class="profile-about bg-light p-2">
            {
                bio && <Fragment>
                    <h2 class="text-primary">{name.trim().split(' ')[0]}s Bio</h2>
                    <p>{bio}</p>
                    <div class="line"></div>
                </Fragment>
            }
            <h2 class="text-primary">Skill Set</h2>
            <div class="skills">
                {skills.map((skills, indx) => (
                    <div class="p-1"><i class="fa fa-check" key={indx}></i> {skills}</div>
                ))}
            </div>
        </div>
    )
}

export default profileAbout;