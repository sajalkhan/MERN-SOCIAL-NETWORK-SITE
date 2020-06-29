const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../Middleware/auth');
const Profile = require('../Models/profileModel');
const User = require('../Models/userModel');

// @route   GET api/Profile
// @desc    Get all user profile
// @access  public
router.get('/', async (req, res) => {

    try {
        const profiles = await Profile.find().populate('user', ['name', 'email', 'avatar']);
        if (!profiles || !profiles.length) return res.json({ msg: 'No profile found!' });
        res.json(profiles);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/Profile/user/:user_id
// @desc    Get profile by user id
// @access  public
router.get('/user/:user_id', async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });
        res.send(profile);

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   GET api/Profile/currentUser
// @desc    Get current user profile
// @access  Private
router.get('/currentUser', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route   Post api/Profile
// @desc    Create or update profile
// @access  Private
router.post('/', [auth, [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // const { company, website, location, status, skills, bio, githubusername, youtube, facebook, linkedin, twitter } = req.body.toString();

        // console.log('test--- ',req.body);

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
        if (req.body.skills) {
            profileFields.skills = req.body.skills.toString().split(',').map(skill => skill.trim())
        }

        // Build social object
        profileFields.social = {}
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

        try {

            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );
                // console.log('test --',profile);
                return res.json(profile);
            }

            //Create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error')
        }
    } catch (error) {
        console.error(error.message);
    }
})

// @route   Post api/Profile
// @desc    Delete a profile
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {

        //Remove user post
        // await Post.deleteMany({user: req.user.id});
        
        // Profile remove
        await Profile.findOneAndRemove({ user: req.user.id });
        // User remove
        await User.findOneAndRemove({ _id: req.user.id });

        res.send({ msg: 'User Deleted!' });
    } catch (err) {
        console.error(err.message);
    }
})

// @route   Put api/Profile/expereince
// @desc    Add profile expereince
// @access  Private
router.put('/experience', [auth,
    [
        check('title', 'Title is Required').not().isEmpty(),
        check('company', 'Company is Required').not().isEmpty(),
        check('from', 'From date is Required').not().isEmpty(),

    ]], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const
            {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            } = req.body;

        const newExpereince = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {

            const profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExpereince);

            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error!');
        }
    })

// @route   Delete api/Profile/experience/:exp_id
// @desc    Delete profile expereince
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {

    try {

        const profile = await Profile.findOne({ user: req.user.id });

        // Get Remove Index
        const removeIndx = profile.experience.findIndex(x => x.id === req.params.exp_id);

        if(removeIndx<0) return res.json({msg: 'Id does not match'});
        profile.experience.splice(removeIndx, 1);

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   Put api/Profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [auth,
    [
        check('school', 'School is Required').not().isEmpty(),
        check('degree', 'Degree is Required').not().isEmpty(),
        check('from', 'From Date is Required').not().isEmpty(),
        check('fieldofstudy', 'Field of study is Required').not().isEmpty(),

    ]], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const
            {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            } = req.body;

        const newEducation = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try {

            const profile = await Profile.findOne({ user: req.user.id });
            profile.education.unshift(newEducation);

            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error!');
        }
    })

// @route   Delete api/Profile/education/:edu_id
// @desc    Delete profile education
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {

    try {

        const profile = await Profile.findOne({ user: req.user.id });

        // Get Remove Index
        const removeIndx = profile.education.findIndex(x => x.id == req.params.edu_id);
        if(removeIndx<0) return res.json({msg: 'Id does not match'});
        profile.education.splice(removeIndx, 1);

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;