import React, {useState, Fragment } from 'react';

//Redux
import { connect } from 'react-redux';
import { addExperience } from '../../Action/profileAction';
import { Link, withRouter } from 'react-router-dom';

const AddExperience = ({addExperience, history}) => {

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [disableTodate, toggleCurentCheckboxInput] = useState(false);

    const {  title, company, location, from, to, current, description } = formData;

    const handleFormData = (e)=> {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    const submitFormData = (e)=> {
        e.preventDefault();
        addExperience(formData, history);
    }

    return (
        <Fragment>
            <h1 class="large text-primary"> Add An Experience</h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add any developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form class="form" onSubmit={(e)=>submitFormData(e)}>
                <div class="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title} onChange={(e)=>handleFormData(e)} required />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={(e)=>handleFormData(e)} required />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={(e)=>handleFormData(e)} />
                </div>
                <div class="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={(e)=>handleFormData(e)} />
                </div>
                <div class="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} 
                    onChange={ (e)=> {
                        setFormData({...formData, current: !current});
                        toggleCurentCheckboxInput(!disableTodate);
                    }}/>{' '} Current Job</p>
                </div>
                <div class="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={(e)=>handleFormData(e)} disabled={disableTodate?'disabled':''}/>
                </div>
                <div class="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description}
                        onChange={(e)=>handleFormData(e)}
                    ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

export default connect(null, { addExperience })(withRouter(AddExperience));